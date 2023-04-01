import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { MyText } from '../MyText';

export type CheckboxProps = {
    /**
     * Checkbox label
     */
    label: string;
    /**
     * The priority of the checkbox, if it is a task item checkbox
     */
    priority?: Task['priority'];
    /**
     * Whether the checkbox is checked or not
     */
    checked?: boolean;
    /**
     * If true, the label will behave as a text input
     */
    editable?: boolean;
    /**
     * Callback fired when the input is focused. `editable` needs to be true.
     */
    onInputFocus?: () => void;
    /**
     * If the input should take the full width of the view, `true` by default
     */
    fullWidthInput?: boolean;
    /**
     * Ref of the TextInput componnet
     */
    inputRef?: React.RefObject<TextInput>;
} & Pick<TextInputProps, 'value' | 'onChangeText'>;

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const {
        label,
        priority = 4,
        editable,
        onInputFocus,
        inputRef,
        fullWidthInput = true,
        value,
        onChangeText,
    } = props;

    const priorityColors = getPriorityColors(priority);

    return (
        <View style={styles.root}>
            <Svg
                stroke={priorityColors.main}
                fill={priorityColors.fill}
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <Circle
                    strokeWidth={priority === 4 ? '1' : '2'}
                    cx="12"
                    cy="12"
                    r="11"
                />
            </Svg>
            {editable ? (
                <TextInput
                    ref={inputRef}
                    style={[
                        styles.label,
                        { width: fullWidthInput ? '100%' : undefined },
                    ]}
                    onFocus={onInputFocus}
                    value={value}
                    onChangeText={onChangeText}
                />
            ) : (
                <Pressable onPress={onInputFocus}>
                    <MyText style={styles.label}>{label}</MyText>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: spacing(2),
    },
});

function getPriorityColors(priority: Task['priority']) {
    switch (priority) {
        case 1:
            return colors.priority.high;
        case 2:
            return colors.priority.medium;
        case 3:
            return colors.priority.low;
        case 4:
            return {
                main: colors.priority.none.main,
                fill: 'transparent',
            };
    }
}

export default Checkbox;
