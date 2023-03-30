import { Modal, ModalProps, Pressable, StyleSheet, View } from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { Backdrop } from '../Backdrop';
import { Checkbox } from '../Checkbox';
import { TaskDueDate } from '../TaskDueDate';

export type ViewTaskModalProps = {
    /**
     * Task information, can be null if no task has been pressed yet
     */
    task: Task | null;
    /**
     * Callback fired when the modal is closed
     */
    onClose: () => void;
} & Pick<ModalProps, 'visible'>;

const ViewTaskModal: React.FC<ViewTaskModalProps> = (props) => {
    const { task, visible, onClose } = props;

    if (!task) {
        return null;
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Backdrop onClose={onClose}>
                <Pressable style={styles.container}>
                    <Checkbox label={task.name} checked={task.completed} />
                    <View style={styles.dueDateContainer}>
                        <TaskDueDate
                            dueDate={task.due_date}
                            size="lg"
                            defaultColorText
                        />
                    </View>
                </Pressable>
            </Backdrop>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: spacing(4),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dueDateContainer: {
        marginTop: spacing(4),
    },
});

export default ViewTaskModal;
