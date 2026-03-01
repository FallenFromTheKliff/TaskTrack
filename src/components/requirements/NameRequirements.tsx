import { useEffect } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { reviseFullName } from '@/utils/auth/revisionUtils';
import { makeRequirementStyles } from '@/styles/components/content/RequirementStyles';

type NameRequirementsProps = {
    fullName: string;
    onValidationChange: (isValid: boolean) => void;
}

export default function NameRequirements({ fullName, onValidationChange }: NameRequirementsProps) {
    const { colors, activeIconColor } = useTheme();
    const requirements = reviseFullName(fullName);
    const s = makeRequirementStyles(colors);

    const allRequirementsMet =
        requirements.hasContent &&
        requirements.hasTwoParts &&
        requirements.hasValidCharacters &&
        requirements.hasValidFirstName &&
        requirements.hasValidLastName;

    useEffect(() => {
        onValidationChange(allRequirementsMet);
    }, [allRequirementsMet]);

    const metColor = activeIconColor ?? colors.accentBlue;
    const unmetColor = colors.errorRed;

    return (
        <View style={[s.container, { borderColor: allRequirementsMet ? colors.borderMid : colors.errorRed }]}>
            <PlayerText style={s.header}>Full Name Requirements:</PlayerText>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasTwoParts ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasTwoParts ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasTwoParts && { color: metColor }]}>
                    First and last name (middle is optional)
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasValidCharacters ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasValidCharacters ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasValidCharacters && { color: metColor }]}>
                    Only letters (periods allowed for middle initials)
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasValidFirstName ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasValidFirstName ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasValidFirstName && { color: metColor }]}>
                    First name at least 2 characters
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasValidLastName ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasValidLastName ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasValidLastName && { color: metColor }]}>
                    Last name at least 2 characters
                </PlayerText>
            </View>
        </View>
    );
}