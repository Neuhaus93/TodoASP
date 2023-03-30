import produce from 'immer';
import { useReducer } from 'react';
import { Task } from '../../api/types';

const initialState = {
    dialogs: {
        createTask: {
            open: false,
        },
        viewTask: {
            open: false,
            task: null as Task | null,
        },
    },
};

type State = typeof initialState;
type Action =
    | { type: 'CREATE_TASK_SET_OPEN'; payload: boolean }
    | { type: 'VIEW_TASK_OPEN'; payload: Task }
    | { type: 'VIEW_TASK_CLOSE' };

const useInboxStateReducer = () => {
    return useReducer(
        produce((draft: State, action: Action) => {
            switch (action.type) {
                case 'CREATE_TASK_SET_OPEN':
                    draft.dialogs.createTask.open = action.payload;
                    break;

                case 'VIEW_TASK_OPEN':
                    draft.dialogs.viewTask.open = true;
                    draft.dialogs.viewTask.task = action.payload;
                    break;

                case 'VIEW_TASK_CLOSE':
                    draft.dialogs.viewTask.open = false;
                    draft.dialogs.viewTask.task = null;
                    break;
            }
        }),
        initialState
    );
};

export default useInboxStateReducer;
