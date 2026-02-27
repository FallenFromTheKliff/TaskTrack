import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        flex: 1,
        width: '100%',
        maxWidth: 450,
        backgroundColor: '#161C24',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splash: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 52,
        marginLeft: 8
    }
});

export default function SplashScreen() {
    const scaleAnim = useRef(new Animated.Value(0.6)).current;
    const fadeAnim  = useRef(new Animated.Value(1)).current;
    const [displayedTitle, setDisplayedTitle] = useState('');
    const projectTitle = "TaskTrack";

    useEffect(() => {
        const clearUsers = async () => {
            try {
                const users = await AsyncStorage.getItem('users');
                if (users) {
                    console.log('📦 Found users:', JSON.parse(users));
                    await AsyncStorage.removeItem('users');
                    await AsyncStorage.removeItem('currentUser');
                    console.log('All users wiped from AsyncStorage!');
                } else {
                    console.log('No users found in AsyncStorage');
                }
            } catch (error) {
                console.error('Failed to clear users:', error);
            }
        };
        clearUsers();
    }, []);

    useEffect(() => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 10, tension: 40, useNativeDriver: true }).start(() => {
            let index = 0;
            const typewriter = setInterval(() => {
                if (index < projectTitle.length) {
                    setDisplayedTitle(projectTitle.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(typewriter);
                    setTimeout(() => {
                        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
                    }, 80);
                }
            }, 60);
        });
    }, []);

    return (
        <View style={styles.outer}>
            <View style={styles.inner}>
                <Animated.View style={[styles.splash, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
                    <Ionicons name="folder-open-sharp" size={56} color='#BFCDDC' />
                    <PlayerText style={styles.title}>{displayedTitle}</PlayerText>
                </Animated.View>
            </View>
        </View>
    );
}