import { useEffect } from 'react';
import { View } from 'react-native';
import { PlayerText } from '@/components/fields/PlayerText';
import { Ionicons } from '@expo/vector-icons';
import { revisePassword } from '@/utils/auth/revisionUtils';
import styles from '@/styles/components/RequirementStyles';

type PasswordRequirementsProps = {
    password: string;
    onValidationChange: (isValid: boolean) => void;
}

export default function PasswordRequirements({ password, onValidationChange }: PasswordRequirementsProps) {
    const requirements = revisePassword(password);
    const allRequirementsMet =
        requirements.minLength &&
        requirements.hasUppercase &&
        requirements.hasLowercase &&
        requirements.hasNumber &&
        requirements.hasSpecial;

    useEffect(() => {
        onValidationChange(allRequirementsMet);
    }, [allRequirementsMet]);

    return (
        <View style={[styles.container, { borderColor: allRequirementsMet ? '#4E5D6D' : '#FF6B6B' }]}>
            <PlayerText style={styles.header}>Password Requirements:</PlayerText>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.minLength ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.minLength ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.minLength && { color: '#8EA7C1', fontWeight: '600' }]}>
                    Minimum 8 characters
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasUppercase ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasUppercase ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasUppercase && { color: '#8EA7C1', fontWeight: '600' }]}>
                    At least one uppercase letter (A-Z)
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasLowercase ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasLowercase ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasLowercase && { color: '#8EA7C1', fontWeight: '600' }]}>
                    At least one lowercase letter (a-z)
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasNumber ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasNumber ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasNumber && { color: '#8EA7C1', fontWeight: '600' }]}>
                    At least one number (0-9)
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasSpecial ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasSpecial ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasSpecial && { color: '#8EA7C1' }]}>
                    At least one special character (@$!%*?&)
                </PlayerText>
            </View>
        </View>
    );
}