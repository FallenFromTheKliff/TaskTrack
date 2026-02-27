import { Text, TextProps, TextInput, TextInputProps, TextStyle, StyleSheet, StyleProp } from 'react-native';

const styles = StyleSheet.create({
    playerText: {
        fontFamily: 'Blrrpix',
        color: '#BFCDDC'
    },
    playerTextInput: {
        fontFamily: 'Blrrpix',
        color: '#BFCDDC',
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 5,
        fontSize: 18
    }
})

interface PlayerTextProps extends TextProps {
    style?: StyleProp<TextStyle>;
}

interface PlayerTextInputProps extends TextInputProps {
    style?: StyleProp<TextStyle>;
}

function PlayerText({ style, ...props }: PlayerTextProps) {
    return <Text style={[ styles.playerText, style ]} {...props} />
}

function PlayerTextInput({ style, ...props }: PlayerTextInputProps) {
    return <TextInput style={[ styles.playerTextInput, style ]} placeholderTextColor="#6D8196" {...props} />
}

export { PlayerText, PlayerTextInput };