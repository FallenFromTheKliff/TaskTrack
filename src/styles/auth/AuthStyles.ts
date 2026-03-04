import { StyleSheet } from 'react-native';

import { ThemeColors } from '@/contexts/ThemeContext';
import { makeScreenContainer } from '@/styles/shared/common';

export function makeAuthStyles(colors: ThemeColors) {
    return StyleSheet.create({
        container: makeScreenContainer(colors),
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
        form: { width: '100%', maxWidth: 350, alignSelf: 'center' },
        footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 }
    });
}