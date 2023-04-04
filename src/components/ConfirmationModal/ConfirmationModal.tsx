import { Pressable, StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { BackdropModal } from '../Backdrop';
import { MyText } from '../MyText';

export type ConfirmationModalProps = {
    /** Whether the modal is visible or not */
    visible: boolean;
    /** Title of the modal */
    title: string;
    /** Description of the task being performed */
    description: string;
    /** Callback fired if pressing "No" or clicking on the backdrop */
    onDismiss: () => void;
    /** Callback fired when pressing "Yes", confirming the action */
    onConfirm: () => void;
};

export const ConfirmationModal = (props: ConfirmationModalProps) => {
    const { visible, title, description, onDismiss, onConfirm } = props;

    return (
        <BackdropModal
            visible={visible}
            onRequestClose={onDismiss}
            position="center"
        >
            <MyText style={styles.title}>{title}</MyText>
            <MyText>{description}</MyText>

            <View style={styles.buttonsContainer}>
                <Pressable onPress={onDismiss}>
                    <MyText style={styles.buttonText}>NO</MyText>
                </Pressable>
                <Pressable
                    onPress={onConfirm}
                    style={{ marginLeft: spacing(10) }}
                >
                    <MyText style={styles.buttonText}>YES</MyText>
                </Pressable>
            </View>
        </BackdropModal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        marginBottom: spacing(3),
    },
    buttonsContainer: {
        marginTop: spacing(5),
        marginRight: spacing(3),
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
    },
});
