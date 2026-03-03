import { useState, useEffect, useRef } from 'react';
import { View, Pressable, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText, AnimatedPlayerText } from '@/components/fields/PlayerText';
import { useTheme, THEME_LABELS, FONT_LABELS, ThemeKey, FontKey } from '@/contexts/ThemeContext';
import { useThemeTransitionAnim } from '@/hooks/animations/useThemeTransitionAnim';
import { useTask } from '@/contexts/TaskContext';
import { useScreen } from '@/contexts/ScreenContext';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { makeSettingsStyles } from '@/styles/components/main/SettingsStyles';

import ConfirmModal from '@/components/modals/ConfirmModal';
import SettingsDropdown from '@/components/fields/SettingsDropdown';

const THEME_KEYS: ThemeKey[] = ['navy', 'citrus', 'light', 'dark'];
const FONT_KEYS: FontKey[] = ['blrrpix', 'caveatbrush', 'geo', 'macondo'];
const THEME_OPTIONS = THEME_KEYS.map(k => ({ label: THEME_LABELS[k], value: k }));
const FONT_OPTIONS = FONT_KEYS.map(k => ({ label: FONT_LABELS[k], value: k }));

export default function SettingsSection() {
    const { colors, activeIconColor, settings, setAppearance, resetAppearance, setUseAnimations, previewTheme, previewFont } = useTheme();
    const { ic } = useThemeTransitionAnim();
    const { clearAllTasks } = useTask();
    const { navigationGuard } = useScreen();
    const { translateY, opacity } = useEntranceAnim();
    const s = makeSettingsStyles(colors);

    const [draftTheme, setDraftTheme] = useState<ThemeKey>(settings.themeKey);
    const [draftFont, setDraftFont] = useState<FontKey>(settings.fontKey);
    const [isClearCacheVisible, setIsClearCacheVisible] = useState(false);
    const [isClearingCache, setIsClearingCache] = useState(false);
    const [dropdownKey, setDropdownKey] = useState(0);

    const appearanceDirty = draftTheme !== settings.themeKey || draftFont !== settings.fontKey;
    const revertRef = useRef<() => void>(() => {});

    useEffect(() => {
        revertRef.current = () => {
            setDraftTheme(settings.themeKey);
            setDraftFont(settings.fontKey);
            previewTheme(null);
            previewFont(null);
        };
    });
    useEffect(() => {
        setDraftTheme(settings.themeKey);
        setDraftFont(settings.fontKey);
    }, [settings.themeKey, settings.fontKey]);

    useEffect(() => {
        navigationGuard.current = appearanceDirty ? () => { revertRef.current(); return false; } : null;
        return () => { navigationGuard.current = null; };
    }, [appearanceDirty, navigationGuard]);

    const handleDraftTheme = (key: ThemeKey) => {
        setDraftTheme(key);
        previewTheme(key);
    };
    const handleDraftFont = (key: FontKey) => {
        setDraftFont(key);
        previewFont(key);
    };
    const handleSave = () => {
        setAppearance(draftTheme, draftFont);
        previewTheme(null);
        previewFont(null);
        setDropdownKey(k => k + 1);
    };
    const handleRevert = () => {
        setDraftTheme(settings.themeKey);
        setDraftFont(settings.fontKey);
        previewTheme(null);
        previewFont(null);
        setDropdownKey(k => k + 1);
    };
    const handleClearCache = async () => {
        setIsClearingCache(true);
        await Promise.all([
            clearAllTasks(),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        resetAppearance();
        setDraftTheme('navy');
        setDraftFont('blrrpix');
        previewTheme(null);
        previewFont(null);
        setDropdownKey(k => k + 1);
        setIsClearingCache(false);
        setIsClearCacheVisible(false);
    };

    return (
        <Animated.View style={[{ flex: 1 }, { opacity, transform: [{ translateY }] }]}>
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <AnimatedPlayerText style={[s.sectionTitle, { color: ic.textDisabled }]}>Sound</AnimatedPlayerText>
                <Animated.View style={[s.block, { backgroundColor: ic.bgPanel, borderColor: ic.borderSub }]}>
                    <View style={s.placeholderBar}>
                        <View style={s.placeholderTrack}>
                            <View style={[s.placeholderFill, { width: '60%' }]} />
                        </View>
                        <Ionicons name="volume-high-outline" size={18} color={colors.textDisabled} />
                    </View>
                    <PlayerText style={s.comingSoon}>Sound effects are not yet available.</PlayerText>
                </Animated.View>
                <AnimatedPlayerText style={[s.sectionTitle, { color: ic.textDisabled }]}>Appearance</AnimatedPlayerText>
                <Animated.View style={[s.block, { backgroundColor: ic.bgPanel, borderColor: ic.borderSub, zIndex: 300 }]}>
                    <View style={{ zIndex: 300 }}>
                        <AnimatedPlayerText style={[s.dropdownLabel, { color: activeIconColor ?? colors.accentBlue }]}>Theme</AnimatedPlayerText>
                        <SettingsDropdown
                            key={`theme-${dropdownKey}`}
                            value={draftTheme}
                            options={THEME_OPTIONS}
                            onSelect={v => handleDraftTheme(v as ThemeKey)}
                        />
                        <AnimatedPlayerText style={[s.blockHint, { color: ic.textMuted }]}>Controls the app-wide color scheme.</AnimatedPlayerText>
                    </View>
                    <Animated.View style={[s.blockDivider, { backgroundColor: ic.borderSub }]} />
                    <View style={{ zIndex: 200 }}>
                        <AnimatedPlayerText style={[s.dropdownLabel, { color: activeIconColor ?? colors.accentBlue }]}>Font</AnimatedPlayerText>
                        <SettingsDropdown
                            key={`font-${dropdownKey}`}
                            value={draftFont}
                            options={FONT_OPTIONS}
                            onSelect={v => handleDraftFont(v as FontKey)}
                        />
                        <AnimatedPlayerText style={[s.blockHint, { color: ic.textMuted }]}>Controls the app-wide font style.</AnimatedPlayerText>
                    </View>
                </Animated.View>
                {appearanceDirty && (
                    <Animated.View style={[s.dirtyBanner, { backgroundColor: ic.bgDivider, borderColor: ic.accentGold }]}>
                        <Ionicons name="alert-circle-outline" size={16} color={colors.accentGold} />
                        <AnimatedPlayerText style={[s.dirtyBannerText, { color: ic.accentGold }]}>
                            Unsaved changes. Navigating away will revert them!
                        </AnimatedPlayerText>
                    </Animated.View>
                )}
                {appearanceDirty && (
                    <View style={s.appearanceActions}>
                        <Animated.View style={[s.revertButton, { backgroundColor: ic.accentRedLight, borderColor: ic.accentRedLightBorder }]}>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }} onPress={handleRevert}>
                                <Ionicons name="refresh-outline" size={18} color={colors.accentRed} />
                                <AnimatedPlayerText style={[s.revertText, { color: ic.accentRed }]}>Revert</AnimatedPlayerText>
                            </Pressable>
                        </Animated.View>
                        <Animated.View style={[s.saveButton, { backgroundColor: ic.greenBg, borderColor: ic.greenBorder }]}>
                            <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }} onPress={handleSave}>
                                <Ionicons name="checkmark-outline" size={18} color={colors.accentGreen} />
                                <AnimatedPlayerText style={[s.saveText, { color: ic.accentGreen }]}>Save Changes</AnimatedPlayerText>
                            </Pressable>
                        </Animated.View>
                    </View>
                )}
                <AnimatedPlayerText style={[s.sectionTitle, { color: ic.textDisabled }]}>Motion</AnimatedPlayerText>
                <Animated.View style={[s.block, { backgroundColor: ic.bgPanel, borderColor: ic.borderSub }]}>
                    <View style={s.toggleRow}>
                        <View style={s.toggleInfo}>
                            <AnimatedPlayerText style={[s.blockLabel, { color: ic.textPrimary }]}>UI Animations</AnimatedPlayerText>
                            <AnimatedPlayerText style={[s.blockHint, { color: ic.textMuted }]}>Enable entrance, expand, and transition animations.</AnimatedPlayerText>
                        </View>
                        <Pressable style={s.toggleButton} onPress={() => setUseAnimations(!settings.useAnimations)}>
                            <Ionicons
                                name={settings.useAnimations ? 'checkmark-circle' : 'ellipse-outline'}
                                size={24}
                                color={settings.useAnimations ? colors.accentGreen : colors.textDisabled}
                            />
                            <AnimatedPlayerText style={[s.toggleLabel, { color: settings.useAnimations ? ic.accentGreen : ic.textDisabled }]}>
                                {settings.useAnimations ? 'ON' : 'OFF'}
                            </AnimatedPlayerText>
                        </Pressable>
                    </View>
                </Animated.View>
                <AnimatedPlayerText style={[s.sectionTitle, { color: ic.textDisabled }]}>Data</AnimatedPlayerText>
                <Animated.View style={[s.block, { backgroundColor: ic.bgPanel, borderColor: ic.borderSub }]}>
                    <AnimatedPlayerText style={[s.blockLabel, { color: ic.textPrimary }]}>Clear Cache</AnimatedPlayerText>
                    <AnimatedPlayerText style={[s.blockHint, { color: ic.textMuted }]}>
                        Restores everything to default, permanently erasing tasks and history!
                    </AnimatedPlayerText>
                    <Animated.View style={[s.dangerButton, { backgroundColor: ic.accentRedLight, borderColor: ic.accentRedLightBorder }]}>
                        <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }} onPress={() => setIsClearCacheVisible(true)}>
                            <Ionicons name="trash-outline" size={18} color={colors.accentRed} />
                            <AnimatedPlayerText style={[s.dangerButtonText, { color: ic.accentRed }]}>Clear Cache</AnimatedPlayerText>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </ScrollView>
            <ConfirmModal
                isVisible={isClearCacheVisible}
                title="Clear Cache?"
                message={`This will reset appearances and permanently delete all tasks and records!`}
                yesLabel="Clear Everything"
                noLabel="Cancel"
                yesIcon="trash-outline"
                yesDestructive
                isLoading={isClearingCache}
                loadingLabel="CLEARING CACHE"
                loadingTitle="Away they go!"
                onNo={() => setIsClearCacheVisible(false)}
                onYes={handleClearCache}
            />
        </Animated.View>
    );
}