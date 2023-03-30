import { Pressable, StyleSheet, View } from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { getTimestampInfo } from '../../utils/dateTime';
import { Checkbox } from '../Checkbox';
import { Divider } from '../Divider';
import { CalendarIcon } from '../Icons';
import { Text } from '../Text';

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
                {!!timestampInfo && (
                    <View style={styles.dateContainer}>
                        <CalendarIcon
                            fill={timestampInfo.color}
                            width="17"
                            height="17"
                        />
                        <Text
                            style={[
                                styles.dateLabel,
                                { color: timestampInfo.color },
                            ]}
                        >
                            {timestampInfo.label}
                        </Text>
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
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 32,
        marginTop: spacing(1),
    },
    dateLabel: {
        marginLeft: spacing(1),
        fontSize: 12,
    },
});

export default TaskItem;
