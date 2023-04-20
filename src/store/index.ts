import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
    menu: {
        open: boolean;
    };
};

type Actions = {
    setMenuOpen: (open: boolean) => void;
};

export const useStore = create(
    immer<State & Actions>((set) => ({
        menu: {
            open: false,
        },
        setMenuOpen: (open) => {
            set((state) => {
                state.menu.open = open;
            });
        },
    }))
);
