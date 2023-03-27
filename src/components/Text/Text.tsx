//
import {
    StyleSheet,
    Text as BaseText,
    TextProps as BaseTextProps,
} from 'react-native';

export type TextProps = {} & BaseTextProps;

const Text: React.FC<TextProps> = (props) => {
    const { ...baseTextProps } = props;

    return (
        <BaseText
            {...baseTextProps}
            style={[styles.root, baseTextProps.style]}
        />
    );
};

const styles = StyleSheet.create({
    root: {
        // fontFamily:
        //     '-apple-system,BlinkMacSystemFont, Segoe UI ,Roboto, Apple Color Emoji ,Helvetica,Arial,sans-serif, Segoe UI Emoji, Segoe UI Symbol',
    },
});

export default Text;
