import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export type ButtonProps = {
    /**
     * Button variant
     */
    variant?: 'outlined' | 'soft';
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
        borderRadius: 8,
        padding: 8,
    },
    outlined: {
        borderWidth: 1,
        borderColor: colors.divider,
    },
    soft: {
        borderWidth: 1,
        borderColor: colors.button.softBg,
        backgroundColor: colors.button.softBg,
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

    switch (args.variant) {
        case 'outlined':
            stylesArray.push(styles.outlined);
            break;

        case 'soft':
            stylesArray.push(styles.soft);
            break;
    }

    return stylesArray;
}

export default Button;
