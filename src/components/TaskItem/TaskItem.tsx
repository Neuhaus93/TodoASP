import { Pressable, StyleSheet, View } from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { getTimestampInfo } from '../../utils/dateTime';
import { Checkbox } from '../Checkbox';
import { Divider } from '../Divider';
import { TaskDueDate } from '../TaskDueDate';

export type TaskItemProps = {
    /**
     * Task information
     */
    task: Task;
    /**
     * Action called when the task item is pressed
     */
    onPress?: (task: Task) => void;
};

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { task, onPress } = props;

    const timestampInfo = getTimestampInfo(task.due_date);

    return (
        <Pressable
            onPress={() => onPress?.(task)}
            android_ripple={{ color: colors.background, foreground: true }}
        >
            <View style={styles.checkboxContainer}>
                <Checkbox label={task.name} checked={task.completed} />
                <View style={styles.dueDateContainer}>
                    <TaskDueDate dueDate={task.due_date} />
                </View>
            </View>
            <Divider />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        marginVertical: spacing(4),
    },
    dueDateContainer: {
        marginLeft: 32,
        marginTop: spacing(1),
    },
    dateLabel: {
        marginLeft: spacing(1),
        fontSize: 12,
    },
});

export default TaskItem;
