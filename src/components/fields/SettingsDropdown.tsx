import { useState } from 'react';
import { View, Pressable, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AnimatedPlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeTransitionAnim } from '@/hooks/animations/useThemeTransitionAnim';
import { makeSettingsDropdownStyles } from '@/styles/components/fields/SettingsDropdownStyles';

type SettingsDropdownProps = {
    value: string;
    options: { label: string; value: string }[];
    onSelect: (val: string) => void;
};

export default function SettingsDropdown({ value, options, onSelect }: SettingsDropdownProps) {
    const { colors, activeIconColor } = useTheme();
    const { ic } = useThemeTransitionAnim();
    const [open, setOpen] = useState(false);
    const s = makeSettingsDropdownStyles(colors);
    const selectedLabel = options.find(o => o.value === value)?.label ?? value;
    const iconColor = activeIconColor ?? colors.textMuted;

    return (
        <View style={[s.wrapper, open && { zIndex: 9999, elevation: 9999 }]}>
            <Animated.View style={[s.button, { backgroundColor: ic.fieldBg, borderColor: ic.fieldBorder }]}>
                <Pressable
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}
                    onPress={() => setOpen(prev => !prev)}
                >
                    <AnimatedPlayerText style={[s.valueText, { color: ic.textPrimary }]}>{selectedLabel}</AnimatedPlayerText>
                    <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={iconColor} />
                </Pressable>
            </Animated.View>
            {open && (
                <Animated.View style={[s.list, { backgroundColor: ic.bgPanel, borderColor: ic.borderStrong }]}>
                    <ScrollView style={s.listScroll} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        {options.map(opt => {
                            const isActive = opt.value === value;
                            return (
                                <Pressable
                                    key={opt.value}
                                    style={[s.item, isActive && { backgroundColor: colors.bgDivider }]}
                                    onPress={() => { onSelect(opt.value); setOpen(false); }}
                                >
                                    <AnimatedPlayerText style={[s.itemText, { color: isActive ? colors.textPrimary : (activeIconColor ?? colors.accentBlue) }]}>
                                        {opt.label}
                                    </AnimatedPlayerText>
                                    {isActive && <Ionicons name="checkmark" size={16} color={iconColor} />}
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </Animated.View>
            )}
        </View>
    );
}