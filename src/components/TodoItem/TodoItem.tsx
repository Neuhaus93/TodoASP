import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { Divider } from '../Divider';

export type TodoItemProps = {} & CheckboxProps;

const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { ...checkboxProps } = props;

    return (
        <View>
            <View style={styles.checkboxContainer}>
                <Checkbox {...checkboxProps} />
            </View>
            <Divider />
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        marginVertical: spacing(4),
    },
});

export default TodoItem;
