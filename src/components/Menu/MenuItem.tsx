import { PropsWithChildren, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { MyText } from '../MyText';
import { useMenuContext } from './MenuContext';

export type MenuItemProps = PropsWithChildren<{
    /**
     * Start Icon
     */
    Icon?: ReactNode;
    /**
     * Callback fired on press icon
     */
    onPress?: () => void;
}>;

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { Icon = null, onPress, children } = props;
    const { closeMenu } = useMenuContext();

    return (
        <Pressable
            onPress={() => {
                if (onPress) {
                    closeMenu();
                    onPress?.();
                }
            }}
            style={styles.root}
        >
            {Icon}
            <MyText style={styles.text}>{children}</MyText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: spacing(3),
        flexDirection: 'row',
    },
    text: {
        marginLeft: spacing(2),
    },
});

export default MenuItem;
