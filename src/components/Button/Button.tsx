import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export type ButtonProps = {
    /**
     * Button variant
     */
    variant?: 'outlined';
} & PressableProps;

const Button: React.FC<ButtonProps> = (props) => {
    const { variant = 'outlined', style, ...rest } = props;

    return <Pressable style={getStyles({ variant, style })} {...rest} />;
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    outlined: {
        borderWidth: 1,
        borderColor: colors.divider,
        borderRadius: 8,
        padding: 8,
    },
});

function getStyles(args: Pick<ButtonProps, 'variant' | 'style'>) {
    const stylesArray: PressableProps['style'] = [styles.base];

    if (args.style) {
        if (Array.isArray(args.style)) {
            stylesArray.push(args.style.flat());
        }

        if (typeof args.style !== 'function') {
            stylesArray.push(args.style);
        }
    }

    if (args.variant === 'outlined') {
        stylesArray.push(styles.outlined);
    }

    return stylesArray;
}

export default Button;
