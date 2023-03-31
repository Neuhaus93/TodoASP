import {
    StyleSheet,
    Text as BaseText,
    TextProps as BaseTextProps,
} from 'react-native';
import { colors } from '../../theme';

export type MyTextProps = {
    /**
     * Color of the text
     */
    color?: keyof (typeof colors)['text'];
} & BaseTextProps;

const MyText: React.FC<MyTextProps> = (props) => {
    const { color = 'primary', style, ...baseTextProps } = props;

    return (
        <BaseText
            {...baseTextProps}
            style={[styles.root, { color: getColorValue(color) }, style]}
        />
    );
};

const styles = StyleSheet.create({
    root: {},
});

function getColorValue(color: NonNullable<MyTextProps['color']>): string {
    return colors.text[color];
}

export default MyText;
