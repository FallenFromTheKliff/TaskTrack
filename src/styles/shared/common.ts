import { StyleSheet } from 'react-native';
import { C, R, MAX_WIDTH } from './tokens';

export const screenContainer = {
    flex: 1,
    backgroundColor: C.bgDeep,
    maxWidth: MAX_WIDTH,
    alignSelf: 'center' as const,
    width: '100%' as const
};

export const modalOverlay = {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: 'transparent'
};

export const modalBlur = {
    position: 'absolute' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: C.overlay88
};

export const modalPanel = {
    backgroundColor: C.bgPanel,
    borderRadius: R.xl,
    borderWidth: 2,
    borderColor: C.borderSub
};

export const panelHeader = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: C.borderSub
};

export const panelFooter = {
    flexDirection: 'row' as const,
    gap: 12,
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: C.borderSub
};

export const cameraBadge = {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    backgroundColor: C.accentBlue,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: C.borderSub
};

export const fieldLabel = {
    fontSize: 18,
    color: C.accentBlue,
    marginBottom: 6,
    marginLeft: 4
};

export const inputRow = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: C.bgInput,
    borderRadius: R.md,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: C.borderStrong
};

export const inputError = {
    marginLeft: 5,
    marginTop: 5,
    height: 20
};

export const cancelButton = {
    flex: 1,
    backgroundColor: C.bgDivider,
    paddingVertical: 14,
    borderRadius: R.md,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: C.borderMid
};

export const cancelText = {
    fontSize: 18,
    color: C.accentBlue
};

export const primaryButton = {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: C.accentBlue,
    paddingVertical: 14,
    borderRadius: R.md,
    borderWidth: 2,
    borderColor: C.textPrimary,
    gap: 8
};

export const primaryButtonText = {
    fontSize: 18,
    color: C.bgDeep
};

export const cardStyles = StyleSheet.create({
    base: {
        backgroundColor: C.bgPanel,
        borderRadius: R.lg,
        borderWidth: 2,
        borderColor: C.borderSub,
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 14,
        gap: 12
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: R.md,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        flex: 1,
        gap: 3
    },
    title: {
        fontSize: 18,
        color: C.textPrimary
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        height: 2,
        backgroundColor: C.borderSub,
        marginHorizontal: 14
    },
    body: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        paddingTop: 12
    },
    detailBox: {
        backgroundColor: C.bgDeep,
        borderRadius: R.md,
        borderWidth: 1,
        borderColor: C.borderSub,
        padding: 10
    },
    detailLabel: {
        fontSize: 12,
        color: C.textMuted
    },
    detailValue: {
        fontSize: 15,
        color: C.accentBlue,
        lineHeight: 22
    }
});

export const checkboxStyles = StyleSheet.create({
    box: {
        width: 22,
        height: 22,
        borderRadius: R.sm,
        borderWidth: 2,
        borderColor: C.borderStrong,
        backgroundColor: C.bgPanel,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxSelected: {
        backgroundColor: C.accentRed,
        borderColor: C.accentRed
    }
});