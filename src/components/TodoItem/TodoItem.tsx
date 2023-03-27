import { StyleSheet, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';
import { spacing } from '../../theme';
import { formatUnixTimestamp } from '../../utils/dateTime';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { Divider } from '../Divider';
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
                        <CalendarIcon color={date.color} />
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

const CalendarIcon: React.FC<{ color: string }> = ({ color }) => (
    <Svg fill={color} width="17" height="17" viewBox="0 0 24 24">
        <Path d="M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM6 6h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1v4H5V7a1 1 0 0 1 1-1zm12 14H6a1 1 0 0 1-1-1v-6h14v6a1 1 0 0 1-1 1z" />
        <Circle cx="8" cy="16" r="1" />
    </Svg>
);

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
