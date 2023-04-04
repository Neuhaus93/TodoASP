import { ReactNode, useCallback, useState } from 'react';
import {
    LayoutRectangle,
    Modal,
    Pressable,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { colors } from '../../theme';
import { MoreVerticalIcon } from '../Icons';
import MenuContext from './MenuContext';
import MenuItem from './MenuItem';

const initialLayout: LayoutRectangle = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
};

export type MenuProps = {
    children: ReactNode;
};

export const Menu = (props: MenuProps) => {
    const { children } = props;
    const [visible, setVisible] = useState(false);
    const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);
    const { width } = useWindowDimensions();
    const position = getPosition(layout, width);

    const closeMenu = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <MenuContext.Provider value={{ visible, closeMenu }}>
            <Pressable
                onPress={() => setVisible(true)}
                onLayout={(event) => {
                    setLayout(event.nativeEvent.layout);
                }}
            >
                <MoreVerticalIcon />
            </Pressable>

            <Modal visible={visible} transparent animationType="fade">
                <Pressable
                    onPressOut={() => setVisible(false)}
                    style={styles.root}
                >
                    <Pressable style={[styles.container, position]}>
                        {children}
                    </Pressable>
                </Pressable>
            </Modal>
        </MenuContext.Provider>
    );
};

Menu.MenuItem = MenuItem;

function getPosition(layout: LayoutRectangle, width: number) {
    return {
        top: layout.y,
        right: width - layout.width - layout.x,
    };
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'relative',
    },
    container: {
        position: 'absolute',
        backgroundColor: colors.background,
        width: 210,
        borderRadius: 8,

        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
