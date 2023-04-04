import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { CheckmarkIcon } from '../Icons';
import { MyText } from '../MyText';

export type CheckboxProps = {
    /**
     * Checkbox label
     */
    label: string;
    /**
     * Callback fired when the checkbox is checked
     */
    onCheck?: () => void;
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
        onCheck,
        checked,
        priority = 4,
        editable,
        onInputFocus,
        inputRef,
        fullWidthInput = true,
        value,
        onChangeText,
    } = props;

    return (
        <View style={styles.root}>
            <Pressable
                onPress={onCheck}
                style={{ alignItems: 'center', justifyContent: 'center' }}
            >
                <CheckmarkIcon checked={!!checked} priority={priority} />
            </Pressable>
            {editable ? (
                <TextInput
                    ref={inputRef}
                    style={[
                        styles.label,
                        { width: fullWidthInput ? '100%' : undefined },
                        checked ? styles.labelCompleted : null,
                    ]}
                    onFocus={onInputFocus}
                    value={value}
                    onChangeText={onChangeText}
                />
            ) : (
                <MyText
                    style={[
                        styles.label,
                        checked ? styles.labelCompleted : null,
                    ]}
                >
                    {label}
                </MyText>
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
    labelCompleted: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: colors.text.secondary,
    },
});

export default Checkbox;
