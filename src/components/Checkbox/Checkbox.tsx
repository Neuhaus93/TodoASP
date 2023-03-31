import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, spacing } from '../../theme';
import { MyText } from '../MyText';

export type CheckboxProps = {
    /**
     * Checkbox label
     */
    label: string;
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
        editable,
        onInputFocus,
        inputRef,
        fullWidthInput = true,
        value,
        onChangeText,
    } = props;

    return (
        <View style={styles.root}>
            <Svg
                stroke={colors.icon}
                fill="transparent"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <Circle strokeWidth="1" cx="12" cy="12" r="11" />
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

export default Checkbox;
