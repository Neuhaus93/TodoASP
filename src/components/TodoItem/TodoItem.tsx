import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { formatUnixTimestamp } from '../../utils/dateTime';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { Divider } from '../Divider';
import { CalendarIcon } from '../Icons';
import { Text } from '../Text';

export type TodoItemProps = {
    /**
     * Todo due date, in Unix timestamp
     */
    dueDate?: number;
} & CheckboxProps;

const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { dueDate, ...checkboxProps } = props;

    const date = formatUnixTimestamp(dueDate);

    return (
        <View>
            <View style={styles.checkboxContainer}>
                <Checkbox {...checkboxProps} />
                {!!date && (
                    <View style={styles.dateContainer}>
                        <CalendarIcon
                            fill={date.color}
                            width="17"
                            height="17"
                        />
                        <Text style={[styles.dateLabel, { color: date.color }]}>
                            {date.label}
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

export default TodoItem;
