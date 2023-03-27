import {
    Modal,
    ModalProps,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Text } from '../components';
import { colors, spacing } from '../theme';

export type CreateTaskModalProps = {
    onClose: () => void;
} & ModalProps;

const CreateTaskModal: React.FC<CreateTaskModalProps> = (props) => {
    const { onClose, ...modalProps } = props;

    return (
        <Modal transparent={true} animationType="fade" {...modalProps}>
            <TouchableWithoutFeedback onPressOut={onClose}>
                <View style={styles.root}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            <TextInput
                                // style={styles.input}
                                // onChangeText={onChangeNumber}
                                // value={number}
                                placeholder="Task name"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        height: 200,
        backgroundColor: colors.background,
        padding: spacing(4),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
});

export default CreateTaskModal;
