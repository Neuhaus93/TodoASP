import { Pressable, StyleSheet, View } from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { Checkbox } from '../Checkbox';
import { Divider } from '../Divider';
import { MyText } from '../MyText';
import { TaskDueDate } from '../TaskDueDate';

export type TaskItemProps = {
    /**
     * Task information
     */
    task: Task;
    /**
     * Don't display the tasks' due date
     */
    hideDate?: boolean;
    /**
     * Action called when the task item is pressed
     */
    onPress?: (task: Task) => void;
    /**
     * Toggle the task as completed or not completed
     */
    onToggleComplete: (task: Task) => void;
};

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { task, hideDate, onPress, onToggleComplete } = props;

    return (
        <Pressable
            onPress={() => onPress?.(task)}
            android_ripple={{ color: colors.background, foreground: true }}
        >
            <View style={styles.checkboxContainer}>
                <Checkbox
                    label={task.name}
                    checked={task.completed}
                    priority={task.priority}
                    onCheck={() => onToggleComplete(task)}
                />
                {task.description && (
                    <MyText
                        numberOfLines={1}
                        style={[
                            styles.taskSubInfo,
                            {
                                fontSize: 12,
                            },
                        ]}
                    >
                        {task.description}
                    </MyText>
                )}
                {!!task.due_date && !hideDate && (
                    <View style={styles.taskSubInfo}>
                        <TaskDueDate hideIfNoDueDate dueDate={task.due_date} />
                    </View>
                )}
            </View>
            <Divider />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        marginVertical: spacing(4),
        paddingRight: spacing(6),
    },
    taskSubInfo: {
        marginLeft: 32,
        marginTop: spacing(1),
    },
    dateLabel: {
        marginLeft: spacing(1),
        fontSize: 12,
    },
});

export default TaskItem;
