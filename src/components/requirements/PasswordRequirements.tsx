import { useEffect } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/forms/PlayerText';
import { useTheme } from '@/contexts/ThemeContext';
import { revisePassword } from '@/utils/auth/revisionUtils';
import { makeRequirementStyles } from '@/styles/components/requirements/RequirementStyles';

type PasswordRequirementsProps = {
    password: string;
    onValidationChange: (isValid: boolean) => void;
}

export default function PasswordRequirements({ password, onValidationChange }: PasswordRequirementsProps) {
    const { colors, activeIconColor } = useTheme();
    const requirements = revisePassword(password);
    const s = makeRequirementStyles(colors);

    const allRequirementsMet =
        requirements.minLength &&
        requirements.hasUppercase &&
        requirements.hasLowercase &&
        requirements.hasNumber &&
        requirements.hasSpecial;

    useEffect(() => {
        onValidationChange(allRequirementsMet);
    }, [allRequirementsMet]);

    const metColor = activeIconColor ?? colors.accentBlue;
    const unmetColor = colors.errorRed;

    return (
        <View style={[s.container, { borderColor: allRequirementsMet ? colors.borderMid : colors.errorRed }]}>
            <PlayerText style={s.header}>Password Requirements:</PlayerText>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.minLength ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.minLength ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.minLength && { color: metColor, fontWeight: '600' }]}>
                    Minimum 8 characters
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasUppercase ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasUppercase ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasUppercase && { color: metColor, fontWeight: '600' }]}>
                    At least one uppercase letter (A-Z)
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasLowercase ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasLowercase ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasLowercase && { color: metColor, fontWeight: '600' }]}>
                    At least one lowercase letter (a-z)
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasNumber ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasNumber ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasNumber && { color: metColor, fontWeight: '600' }]}>
                    At least one number (0-9)
                </PlayerText>
            </View>
            <View style={s.requirement}>
                <Ionicons
                    name={requirements.hasSpecial ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={requirements.hasSpecial ? metColor : unmetColor}
                />
                <PlayerText style={[s.requirementText, requirements.hasSpecial && { color: metColor }]}>
                    At least one special character (@$!%*?&)
                </PlayerText>
            </View>
        </View>
    );
}