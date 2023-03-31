import produce from 'immer';
import { useReducer } from 'react';
import { Task } from '../../api/types';

const initialState = {
    dialogs: {
        createTask: {
            key: `createTask-0`,
            open: false,
        },
        viewTask: {
            key: `viewTask-0`,
            open: false,
            taskId: null as Task['id'] | null,
        },
    },
};

type State = typeof initialState;
type Action =
    | { type: 'CREATE_TASK_OPEN' }
    | { type: 'CREATE_TASK_CLOSE' }
    | { type: 'VIEW_TASK_OPEN'; payload: Task['id'] }
    | { type: 'VIEW_TASK_CLOSE' };

const useInboxStateReducer = () => {
    return useReducer(
        produce((draft: State, action: Action) => {
            switch (action.type) {
                case 'CREATE_TASK_OPEN':
                    draft.dialogs.createTask.key = updateValue(
                        draft.dialogs.createTask.key
                    );
                    draft.dialogs.createTask.open = true;
                    break;

                case 'CREATE_TASK_CLOSE':
                    draft.dialogs.createTask.open = false;
                    break;

                case 'VIEW_TASK_OPEN':
                    draft.dialogs.viewTask.key = updateValue(
                        draft.dialogs.viewTask.key
                    );
                    draft.dialogs.viewTask.open = true;
                    draft.dialogs.viewTask.taskId = action.payload;
                    break;

                case 'VIEW_TASK_CLOSE':
                    draft.dialogs.viewTask.open = false;
                    draft.dialogs.viewTask.taskId = null;
                    break;
            }
        }),
        initialState
    );
};

/**
 * Update the value of a given key
 *
 * @returns
 */
function updateValue(value: string): string {
    const [id, keyIndex] = value.split('-');

    return [id, Number(keyIndex) + 1].join('-');
}

export default useInboxStateReducer;
