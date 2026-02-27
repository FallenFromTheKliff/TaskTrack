import { reviseEmail } from "@/utils/auth/revisionUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const validateUsername = (userName: string) => {
    if (!userName) return 'A username is required!';
    if (userName.length < 3) return 'Your username must be at least 3 characters!';
    if (!/^[a-zA-Z0-9_]+$/.test(userName)) return 'A username can only contain letters, numbers, and underscores!';
    return true;
};

export const validateFullName = (fullName: string) => {
    const trimmedName = fullName.trim();
    if (!trimmedName) return 'Please enter your full name!';
    return true;
};

export const validateEmail = (email: string) => {
    const checkEmail = reviseEmail(email);
    if (!email) return 'Please enter your email address!';
    if (!checkEmail.isValid) return 'Please enter a valid email address!';
    if (!checkEmail.hasMinNameLength) return 'Email name needs at least 8 characters!';
    return true;
}
export const validateEmailLogin = (email: string) => {
    if (!email) return 'Please enter your email address!';
    return true;
};
export const validateEmailRegister = async (email: string) => {
    const checkEmail = reviseEmail(email);
    if (!email) return 'Please enter your email address!';
    if (!checkEmail.isValid) return 'Please enter a valid email address!';
    try {
        const usersJSON = await AsyncStorage.getItem('users');
        const users = usersJSON ? JSON.parse(usersJSON) : [];
        const emailExists = users.some((u: any) => u.email === email);
        if (emailExists) return 'This email is already registered!';
    } catch (error) {
        console.error('Error checking email:', error);
    }
    return true;
};

export const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim() === '') return true;
    if (!/^09\d{9}$/.test(phoneNumber) || phoneNumber.length > 11) return 'Invalid phone number format!';
    return true;
};

export const validatePassword = (password: string) => {
    if (!password) return 'Please enter your password!';
    return true;
};
export const validateNewPassword = (currentPassword: string, newPassword: string) => {
    if (!newPassword) return 'Please enter your new password!';
    if (currentPassword === newPassword) return 'New password must be different from the current password!';
    return true;
};
export const validatePasswordConfirmation = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return 'Please confirm your password!';
    if (password !== confirmPassword) return 'Passwords do not match!';
    return true;
};

export const validateTitle = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return 'A title is required!';
    if (trimmed.length > 30) return 'Title must be 30 characters or less!';
    return true;
};

export const validateDescription = (description: string) => {
    const trimmed = description.trim();
    if (!trimmed) return 'A description is required!';
    if (trimmed.length > 200) return 'Description must be 200 characters or less!';
    return true;
};

export const validateNotes = (notes: string) => {
    if (notes.trim().length > 50) return 'Notes must be 50 characters or less!';
    return true;
};