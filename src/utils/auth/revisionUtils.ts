import * as Crypto from 'expo-crypto';

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeFullName = (fullName: string): string => {
    return fullName
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
export const reviseFullName = (fullName: string) => {
    const trimmedName = fullName.trim();
    const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);

    const hasContent = trimmedName.length > 0;
    const hasTwoParts = nameParts.length >= 2;

    let hasValidCharacters = true;
    if (nameParts.length > 0) {
        for (const part of nameParts) {
            if (!/^[a-zA-Z.]+$/.test(part)) {
                hasValidCharacters = false;
                break;
            }
        }
    } else {
        hasValidCharacters = false;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const hasValidFirstName = firstName && firstName.length >= 2;
    const hasValidLastName = lastName && lastName.length >= 2;
    return { hasContent, hasTwoParts, hasValidCharacters, hasValidFirstName, hasValidLastName };
};

export const reviseEmail = (email: string) => {
    const chopped = email?.trim() ?? '';
    const [name = ''] = chopped.split('@');
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(chopped);
    const hasMinNameLength = name.length >= 8;
    return { email: chopped, name, isValid, hasMinNameLength };
};

export const hashPassword = async (password: string): Promise<string> => {
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
};
export const revisePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    return { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecial };
};