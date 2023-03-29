import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { getTimestampInfo } from '../../utils/dateTime';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { Divider } from '../Divider';
import { CalendarIcon } from '../Icons';
import { Text } from '../Text';

export type TaskItemProps = {
    /**
     * Todo due date, in Unix timestamp
     */
    timestamp: number | null;
} & CheckboxProps;

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { timestamp, ...checkboxProps } = props;

    const timestampInfo = getTimestampInfo(timestamp);

    return (
        <View>
            <View style={styles.checkboxContainer}>
                <Checkbox {...checkboxProps} />
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
        </View>
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
