import React, { PropsWithChildren } from 'react';
import { Modal, ModalProps, Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export type BackdropProps = PropsWithChildren<{
    /**
     * Callback fired when the backdrop is closed
     */
    onClose: () => void;
}>;

export type BackdropModalProps = PropsWithChildren<
    {
        /**
         * Whether the modal is expanded (full height) or not
         * @default {false}
         */
        expanded?: boolean;
    } & Pick<
        ModalProps,
        'visible' | 'onShow' | 'onRequestClose' | 'animationType'
    >
>;

export const BackdropModal: React.FC<BackdropModalProps> = (props) => {
    const { animationType = 'fade', expanded } = props;

    return (
        <Modal
            visible={props.visible}
            transparent={true}
            animationType={animationType}
            onShow={props.onShow}
            onRequestClose={props.onRequestClose}
        >
            <Pressable onPressOut={props.onRequestClose} style={styles.root}>
                <Pressable
                    style={[
                        styles.container,
                        expanded ? styles.containerExpanded : undefined,
                    ]}
                >
                    {props.children}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => (
    <Pressable onPressOut={onClose} style={styles.root}>
        {children}
    </Pressable>
);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        backgroundColor: colors.background,
        padding: spacing(4),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    containerExpanded: {
        height: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export default Backdrop;
