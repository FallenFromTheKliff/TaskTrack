import * as ImagePicker from 'expo-image-picker';

const PLACEHOLDER = require('../../../assets/images/placeholder.jpeg');

export const getProfileImageSource = (uri: string | null | undefined) =>
    uri ? { uri } : PLACEHOLDER;

const IMAGE_PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5
};

export const pickImageFromLibrary = async (): Promise<string | null> => {
    const result = await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);
    return result.canceled ? null : result.assets[0].uri;
};