import {
    Text as BaseText,
    TextProps as BaseTextProps,
    StyleSheet,
    TextStyle,
} from 'react-native';
import { colors } from '../../theme';

export type MyTextProps = {
    /**
     * Color of the text
     */
    color?: keyof (typeof colors)['text'];
    /** Font weight */
    fontWeight?: 'normal' | 'bold';
} & BaseTextProps;

const MyText: React.FC<MyTextProps> = (props) => {
    const { color = 'primary', fontWeight, style, ...baseTextProps } = props;

    return (
        <BaseText
            {...baseTextProps}
            style={[
                styles.root,
                {
                    color: getColorValue(color),
                    fontWeight: getFontWeight(fontWeight),
                },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    root: {},
});

function getFontWeight(
    fontWeight: MyTextProps['fontWeight']
): TextStyle['fontWeight'] {
    switch (fontWeight) {
        case 'normal':
            return '400';

        case 'bold':
            return '700';

        default:
            return '400';
    }
}

function getColorValue(color: NonNullable<MyTextProps['color']>): string {
    return colors.text[color];
}

export default MyText;
