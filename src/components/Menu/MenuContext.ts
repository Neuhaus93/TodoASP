import { createContext, useContext } from 'react';

const MenuContext = createContext<{
    visible: boolean;
    closeMenu: () => void;
} | null>(null);

export function useMenuContext() {
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error(
            'Menu.* component must be rendered as child of ProductCard component'
        );
    }

    return context;
}

export default MenuContext;
