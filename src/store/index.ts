import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task } from '../api/types';

type State = {
    menu: {
        open: boolean;
    };
    displaySettings: {
        showCompleted: boolean;
    };
    createTaskModal: {
        key: string;
        open: boolean;
    };
    viewTaskModal: {
        key: string;
        open: boolean;
        task: Task | null;
    };
};

type Actions = {
    setMenuOpen: (open: boolean) => void;
    setShowCompleted: (show: boolean) => void;
    openCreateTaskModal: () => void;
    closeCreateTaskModal: () => void;
    openViewTaskModal: (task: Task) => void;
    closeViewTaskModal: () => void;
};

export const useStore = create(
    immer<State & Actions>((set) => ({
        menu: {
            open: false,
        },
        displaySettings: {
            showCompleted: false,
        },
        createTaskModal: {
            key: `createTask-0`,
            open: false,
        },
        viewTaskModal: {
            key: `viewTask-0`,
            open: false,
            task: null,
        },
        setMenuOpen: (open) => {
            set((state) => {
                state.menu.open = open;
            });
        },
        setShowCompleted: (show) => {
            set((state) => {
                state.displaySettings.showCompleted = show;
            });
        },
        openCreateTaskModal: () => {
            set((state) => {
                state.createTaskModal.key = updateKey(
                    state.createTaskModal.key
                );
                state.createTaskModal.open = true;
            });
        },
        closeCreateTaskModal: () => {
            set((state) => {
                state.createTaskModal.open = false;
            });
        },
        openViewTaskModal: (task) => {
            set((state) => {
                state.viewTaskModal.key = updateKey(state.viewTaskModal.key);
                state.viewTaskModal.open = true;
                state.viewTaskModal.task = task;
            });
        },
        closeViewTaskModal: () => {
            set((state) => {
                state.viewTaskModal.open = false;
            });
        },
    }))
);

/**
 * Update the value of a given key
 *
 * @returns
 */
function updateKey(value: string): string {
    const [id, keyIndex] = value.split('-');

    return [id, Number(keyIndex) + 1].join('-');
}
