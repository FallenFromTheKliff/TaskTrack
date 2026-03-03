import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';

export function makeAuthStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgDeep,
            maxWidth: 450,
            alignSelf: 'center',
            width: '100%'
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 40,
            paddingHorizontal: 20
        },
        header: { alignItems: 'center', width: '100%' },
        pictureFrame: {
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: colors.borderStrong
        },
        pictureBomb: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: colors.accentBlue,
            borderRadius: 15,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.borderSub
        },
        form: { width: '100%', maxWidth: 350, alignSelf: 'center' },
        footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 }
    });
}