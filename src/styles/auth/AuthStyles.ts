import { StyleSheet } from 'react-native';
import { cameraBadge, fieldLabel, inputRow, inputError } from '@/styles/shared/common';
import { C, R } from '@/styles/shared/tokens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: C.bgDeep,
        maxWidth: 450,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center'
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    pictureFrame: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: C.borderStrong
    },
    pictureBomb: cameraBadge,
    form: {
        width: '100%',
        maxWidth: 350,
        alignSelf: 'center'
    },
    label: fieldLabel,
    inputField: inputRow,
    inputError: inputError,
    button: {
        backgroundColor: C.accentBlue,
        paddingVertical: 15,
        borderRadius: R.md,
        marginTop: 15,
        marginBottom: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: C.bgDivider,
        fontSize: 24
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40
    },
    link: {
        color: C.accentBlue,
        fontSize: 18,
        textDecorationLine: 'underline',
        marginLeft: 5
    }
});

export default styles;