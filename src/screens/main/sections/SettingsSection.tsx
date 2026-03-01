import { useState, useEffect, useRef } from 'react';
import { View, Pressable, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme, THEME_LABELS, FONT_LABELS, FONT_COLORS, FONT_COLOR_LABELS, FONT_COLOR_KEYS_BY_THEME, ThemeKey, FontKey, FontColorKey } from '@/contexts/ThemeContext';
import { useTask } from '@/contexts/TaskContext';
import { useHistory } from '@/contexts/HistoryContext';
import { useScreen } from '@/contexts/ScreenContext';
import { useEntranceAnim } from '@/hooks/animations/useEntranceAnim';
import { makeSettingsStyles } from '@/styles/components/main/SettingsStyles';

import ConfirmModal from '@/components/modals/ConfirmModal';
import SettingsDropdown from '@/components/fields/SettingsDropdown';

const THEME_KEYS: ThemeKey[] = ['navy', 'citrus', 'light', 'dark'];
const FONT_KEYS: FontKey[] = ['blrrpix', 'caveatbrush', 'geo', 'macondo', 'notoserif'];
const THEME_OPTIONS = THEME_KEYS.map(k => ({ label: THEME_LABELS[k], value: k }));
const FONT_OPTIONS = FONT_KEYS.map(k => ({ label: FONT_LABELS[k], value: k }));

export default function SettingsSection() {
    const { colors, activeIconColor, settings, setAppearance, setUseAnimations, previewTheme, previewFont, previewFontColor } = useTheme();
    const { tasks, clearAllTasks } = useTask();
    const { history } = useHistory();
    const { navigationGuard } = useScreen();
    const { translateY, opacity } = useEntranceAnim();
    const s = makeSettingsStyles(colors, activeIconColor);

    const [draftTheme, setDraftTheme] = useState<ThemeKey>(settings.themeKey);
    const [draftFont, setDraftFont] = useState<FontKey>(settings.fontKey);
    const [draftFontColor, setDraftFontColor] = useState<FontColorKey>(settings.fontColorKey);
    const [isClearCacheVisible, setIsClearCacheVisible] = useState(false);
    const [isClearingCache, setIsClearingCache] = useState(false);

    const appearanceDirty = draftTheme !== settings.themeKey || draftFont !== settings.fontKey || draftFontColor !== settings.fontColorKey;
    const revertRef = useRef<() => void>(() => {});

    useEffect(() => {
        revertRef.current = () => {
            setDraftTheme(settings.themeKey);
            setDraftFont(settings.fontKey);
            setDraftFontColor(settings.fontColorKey);
            previewTheme(null);
            previewFont(null);
            previewFontColor(null);
        };
    });

    useEffect(() => {
        setDraftTheme(settings.themeKey);
        setDraftFont(settings.fontKey);
        setDraftFontColor(settings.fontColorKey);
    }, [settings.themeKey, settings.fontKey, settings.fontColorKey]);

    useEffect(() => {
        navigationGuard.current = appearanceDirty ? () => { revertRef.current(); return false; } : null;
        return () => { navigationGuard.current = null; };
    }, [appearanceDirty, navigationGuard]);

    const handleDraftTheme = (key: ThemeKey) => {
        setDraftTheme(key);
        previewTheme(key);
        const validKeys = FONT_COLOR_KEYS_BY_THEME[key];
        if (!validKeys.includes(draftFontColor)) {
            setDraftFontColor('default');
            previewFontColor('default');
        }
    };
    const handleDraftFont = (key: FontKey) => {
        setDraftFont(key);
        previewFont(key);
    };
    const handleDraftFontColor = (key: FontColorKey) => {
        setDraftFontColor(key);
        previewFontColor(key);
    };
    const handleSave = () => {
        setAppearance(draftTheme, draftFont, draftFontColor);
        previewTheme(null);
        previewFont(null);
        previewFontColor(null);
    };
    const handleRevert = () => {
        setDraftTheme(settings.themeKey);
        setDraftFont(settings.fontKey);
        setDraftFontColor(settings.fontColorKey);
        previewTheme(null);
        previewFont(null);
        previewFontColor(null);
    };
    const handleClearCache = async () => {
        setIsClearingCache(true);
        await Promise.all([
            clearAllTasks(),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        setAppearance('navy', 'blrrpix', 'default');
        setDraftTheme('navy');
        setDraftFont('blrrpix');
        setDraftFontColor('default');
        previewTheme(null);
        previewFont(null);
        previewFontColor(null);
        setIsClearingCache(false);
        setIsClearCacheVisible(false);
    };

    const totalItems = tasks.length + history.length;
    const fontColorKeys = FONT_COLOR_KEYS_BY_THEME[draftTheme];
    const captionColor = draftFontColor !== 'default'
        ? (FONT_COLORS[draftFontColor] === '#0A0A0A' ? colors.textPrimary : (FONT_COLORS[draftFontColor] || colors.textPrimary))
        : colors.textMuted;

    return (
        <Animated.View style={[{ flex: 1 }, { opacity, transform: [{ translateY }] }]}>
            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <PlayerText style={s.sectionTitle}>Sound</PlayerText>
                <View style={s.block}>
                    <View style={s.placeholderBar}>
                        <View style={s.placeholderTrack}>
                            <View style={[s.placeholderFill, { width: '60%' }]} />
                        </View>
                        <Ionicons name="volume-high-outline" size={18} color={colors.textDisabled} />
                    </View>
                    <PlayerText style={s.comingSoon}>Sound effects are not yet available.</PlayerText>
                </View>

                <PlayerText style={s.sectionTitle}>Appearance</PlayerText>
                <View style={[s.block, { zIndex: 300 }]}>
                    <View style={{ zIndex: 300 }}>
                        <PlayerText style={s.blockHint}>Controls the app-wide color scheme.</PlayerText>
                        <SettingsDropdown
                            label="Theme"
                            value={draftTheme}
                            options={THEME_OPTIONS}
                            onSelect={v => handleDraftTheme(v as ThemeKey)}
                        />
                    </View>
                    <View style={s.blockDivider} />
                    <View style={{ zIndex: 200 }}>
                        <PlayerText style={s.blockHint}>Controls the app-wide font style.</PlayerText>
                        <SettingsDropdown
                            label="Font"
                            value={draftFont}
                            options={FONT_OPTIONS}
                            onSelect={v => handleDraftFont(v as FontKey)}
                        />
                    </View>
                    <View style={s.blockDivider} />
                    <View style={{ zIndex: 100 }}>
                        <PlayerText style={s.blockHint}>Controls the font and icon color across the app.</PlayerText>
                        <PlayerText style={s.fontColorLabel}>Font and Icon Color</PlayerText>
                        <View style={s.fontColorRow}>
                            {fontColorKeys.map(key => {
                                const colorValue = FONT_COLORS[key];
                                const isActive = draftFontColor === key;
                                const swatchColor = colorValue || colors.textPrimary;
                                return (
                                    <Pressable
                                        key={key}
                                        style={[s.fontColorSwatch, { borderColor: isActive ? swatchColor : colors.borderSub }]}
                                        onPress={() => handleDraftFontColor(key)}
                                    >
                                        <View style={[s.fontColorSwatchInner, { backgroundColor: swatchColor }]} />
                                        {isActive && (
                                            <View style={s.fontColorSwatchCheck}>
                                                <Ionicons name="checkmark" size={9} color={colors.bgPanel} />
                                            </View>
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>
                        <PlayerText style={[s.fontColorCaption, { color: captionColor }]}>
                            {FONT_COLOR_LABELS[draftFontColor]}
                        </PlayerText>
                    </View>
                </View>
                {appearanceDirty && (
                    <View style={s.dirtyBanner}>
                        <Ionicons name="alert-circle-outline" size={16} color={colors.accentGold} />
                        <PlayerText style={[s.dirtyBannerText, { color: colors.accentGold }]}>
                            Unsaved changes. Navigating away will revert them.
                        </PlayerText>
                    </View>
                )}
                {appearanceDirty && (
                    <View style={s.appearanceActions}>
                        <Pressable style={s.revertButton} onPress={handleRevert}>
                            <Ionicons name="refresh-outline" size={18} color={colors.accentRed} />
                            <PlayerText style={s.revertText}>Revert</PlayerText>
                        </Pressable>
                        <Pressable style={s.saveButton} onPress={handleSave}>
                            <Ionicons name="checkmark-outline" size={18} color={colors.accentGreen} />
                            <PlayerText style={s.saveText}>Save Changes</PlayerText>
                        </Pressable>
                    </View>
                )}

                <PlayerText style={s.sectionTitle}>Motion</PlayerText>
                <View style={s.block}>
                    <View style={s.toggleRow}>
                        <View style={s.toggleInfo}>
                            <PlayerText style={s.blockLabel}>UI Animations</PlayerText>
                            <PlayerText style={s.blockHint}>Enable entrance, expand, and transition animations.</PlayerText>
                        </View>
                        <Pressable style={s.toggleButton} onPress={() => setUseAnimations(!settings.useAnimations)}>
                            <Ionicons
                                name={settings.useAnimations ? 'checkmark-circle' : 'ellipse-outline'}
                                size={24}
                                color={settings.useAnimations ? colors.accentGreen : colors.textDisabled}
                            />
                            <PlayerText style={[s.toggleLabel, settings.useAnimations && { color: colors.accentGreen }]}>
                                {settings.useAnimations ? 'ON' : 'OFF'}
                            </PlayerText>
                        </Pressable>
                    </View>
                </View>

                <PlayerText style={s.sectionTitle}>Data</PlayerText>
                <View style={s.block}>
                    <PlayerText style={s.blockLabel}>Clear Cache</PlayerText>
                    <PlayerText style={s.blockHint}>
                        Permanently deletes all ({totalItem(totalItems)}). This cannot be undone.
                    </PlayerText>
                    <Pressable style={s.dangerButton} onPress={() => setIsClearCacheVisible(true)}>
                        <Ionicons name="trash-outline" size={18} color={colors.accentRed} />
                        <PlayerText style={s.dangerButtonText}>Clear Cache</PlayerText>
                    </Pressable>
                </View>
            </ScrollView>
            <ConfirmModal
                isVisible={isClearCacheVisible}
                title="Clear Cache?"
                message={`This will permanently delete ${totalItem(totalItems)}. This cannot be undone.`}
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

function totalItem(count: number) {
    return `${count} item${count !== 1 ? 's' : ''}`;
}