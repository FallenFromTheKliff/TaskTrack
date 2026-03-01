import { ReactNode, createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { hashPassword } from '@/utils/auth/revisionUtils';

interface User {
    id: string;
    profilePicture: string | null;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth?: string;
    gender?: string;
    createdAt: string;
}
interface StoredUser extends User {
    password: string;
}
interface RegisterData {
    profilePicture: string | null;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
}
interface UpdateProfileData {
    profilePicture?: string | null;
    userName?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    password?: string;
}
interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<User | undefined>;
    commitLogin: () => void;
    register: (userData: RegisterData) => Promise<User | undefined>;
    updateProfile: (userData: UpdateProfileData) => Promise<User | undefined>;
    verifyAndChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    deleteUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TASKS_KEY = '@tasktrack_tasks';
const HISTORY_KEY = '@tasktrack_history';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const pendingUser = useRef<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        loadStoredUser();
    }, []);

    const loadStoredUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('currentUser');
            if (storedUser) setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error('Failed to load stored user:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<User | undefined> => {
        const usersJSON = await AsyncStorage.getItem('users');
        const users: StoredUser[] = usersJSON ? JSON.parse(usersJSON) : [];
        const hashed = await hashPassword(password);
        const foundUser = users.find(u => u.email === email && u.password === hashed);
        if (!foundUser) return undefined;
        const { password: _, ...userWithoutPassword } = foundUser;
        await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        pendingUser.current = userWithoutPassword;
        return userWithoutPassword;
    };

    const commitLogin = () => {
        if (pendingUser.current) {
            setUser(pendingUser.current);
            pendingUser.current = null;
        }
    };

    const register = async (userData: RegisterData): Promise<User | undefined> => {
        const usersJSON = await AsyncStorage.getItem('users');
        const users: StoredUser[] = usersJSON ? JSON.parse(usersJSON) : [];
        if (users.some(u => u.email === userData.email)) throw new Error('Email already exists');
        const newUser: User = {
            id: Date.now().toString(),
            profilePicture: userData.profilePicture,
            userName: userData.userName,
            fullName: userData.fullName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            createdAt: new Date().toISOString()
        };
        const storedNew: StoredUser = { ...newUser, password: await hashPassword(userData.password) };
        users.push(storedNew);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        return newUser;
    };

    const updateProfile = async (userData: UpdateProfileData): Promise<User | undefined> => {
        if (!user) throw new Error('No user logged in');
        const usersJSON = await AsyncStorage.getItem('users');
        const users: StoredUser[] = usersJSON ? JSON.parse(usersJSON) : [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex === -1) throw new Error('User not found');
        const existing = users[userIndex];
        const updatedUser: StoredUser = {
            ...existing,
            profilePicture: 'profilePicture' in userData ? (userData.profilePicture ?? null) : existing.profilePicture,
            userName: userData.userName !== undefined ? userData.userName : existing.userName,
            fullName: userData.fullName !== undefined ? userData.fullName : existing.fullName,
            email: userData.email !== undefined ? userData.email : existing.email,
            phoneNumber: userData.phoneNumber !== undefined ? userData.phoneNumber : existing.phoneNumber,
            dateOfBirth: userData.dateOfBirth !== undefined ? userData.dateOfBirth : existing.dateOfBirth,
            gender: userData.gender !== undefined ? userData.gender : existing.gender,
            password: userData.password ? await hashPassword(userData.password) : existing.password
        };
        users[userIndex] = updatedUser;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        const { password: _, ...userWithoutPassword } = updatedUser;
        await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return userWithoutPassword;
    };

    const verifyAndChangePassword = async (currentPassword: string, newPassword: string) => {
        if (!user) throw new Error('No user logged in');
        const usersJSON = await AsyncStorage.getItem('users');
        const users: StoredUser[] = usersJSON ? JSON.parse(usersJSON) : [];
        const storedUser = users.find(u => u.id === user.id);
        if (!storedUser) throw new Error('User not found');
        const hashedCurrent = await hashPassword(currentPassword);
        if (storedUser.password !== hashedCurrent) throw new Error('Incorrect current password');
        const hashedNew = await hashPassword(newPassword);
        if (storedUser.password === hashedNew) throw new Error('New password must differ from current password');
        await updateProfile({ password: newPassword });
    };

    const deleteUser = async () => {
        if (!user) throw new Error('No user logged in');
        const usersJSON = await AsyncStorage.getItem('users');
        const users: StoredUser[] = usersJSON ? JSON.parse(usersJSON) : [];
        await AsyncStorage.setItem('users', JSON.stringify(users.filter(u => u.id !== user.id)));
        await AsyncStorage.removeItem(`${TASKS_KEY}_${user.id}`);
        await AsyncStorage.removeItem(`${HISTORY_KEY}_${user.id}`);
        await AsyncStorage.removeItem('currentUser');
        setUser(null);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('currentUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, commitLogin, register, updateProfile, verifyAndChangePassword, deleteUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider!');
    return context;
};