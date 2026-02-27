import { useEffect } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PlayerText } from '@/components/fields/PlayerText';
import { reviseFullName } from '@/utils/auth/revisionUtils';

import styles from '@/styles/components/RequirementStyles';

type NameRequirementsProps = {
    fullName: string;
    onValidationChange: (isValid: "" | boolean) => void;
}

export default function NameRequirements({ fullName, onValidationChange }: NameRequirementsProps) {
    const requirements = reviseFullName(fullName);

    const allRequirementsMet =
        requirements.hasContent &&
        requirements.hasTwoParts &&
        requirements.hasValidCharacters &&
        requirements.hasValidFirstName &&
        requirements.hasValidLastName;

    useEffect(() => {
        onValidationChange(allRequirementsMet);
    }, [allRequirementsMet]);

    return (
        <View style={[styles.container, { borderColor: allRequirementsMet ? '#4E5D6D' : '#FF6B6B' }]}>
            <PlayerText style={styles.header}>Full Name Requirements:</PlayerText>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasTwoParts ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasTwoParts ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasTwoParts && { color: '#8EA7C1' }]}>
                    First and last name (middle is optional)
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasValidCharacters ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasValidCharacters ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasValidCharacters && { color: '#8EA7C1' }]}>
                    Only letters (periods allowed for middle initials)
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasValidFirstName ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasValidFirstName ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasValidFirstName && { color: '#8EA7C1' }]}>
                    First name at least 2 characters
                </PlayerText>
            </View>

            <View style={styles.requirement}>
                <Ionicons
                    name={requirements.hasValidLastName ? "checkmark-circle" : "close-circle"}
                    size={16}
                    color={requirements.hasValidLastName ? "#8EA7C1" : "#FF6B6B"}
                />
                <PlayerText style={[styles.requirementText, requirements.hasValidLastName && { color: '#8EA7C1' }]}>
                    Last name at least 2 characters
                </PlayerText>
            </View>
        </View>
    );
}