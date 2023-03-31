import produce from 'immer';
import { useReducer } from 'react';
import { Task } from '../../api/types';

const getInitialState = (task: Task | null) => ({
    values: {
        name: task?.name || '',
        description: task?.description || '',
        date: task?.due_date ? new Date(task.due_date * 1000) : null,
    },
    showDatePicker: false,
    editView: false,
    viewExpanded: false,
});

type State = ReturnType<typeof getInitialState>;
type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_DESCRIPTION'; payload: string }
    | { type: 'SET_DATE'; payload: Date | null }
    | { type: 'TASK_UPDATED' }
    | { type: 'SET_SHOW_DATE_PICKER'; payload: boolean }
    | { type: 'SET_EDIT_VIEW'; payload: boolean }
    | { type: 'EXPAND_VIEW' };

export const useViewTaskReducer = (task: Task | null) => {
    const [state, dispatch] = useReducer(
        produce((draft: State, action: Action) => {
            switch (action.type) {
                case 'SET_NAME':
                    draft.values.name = action.payload;
                    break;

                case 'SET_DESCRIPTION':
                    draft.values.description = action.payload;
                    break;

                case 'SET_DATE':
                    draft.values.date = action.payload;
                    break;

                case 'TASK_UPDATED':
                    draft.values.name = draft.values.name.trim();
                    draft.values.description = draft.values.description.trim();
                    draft.editView = false;
                    break;

                case 'SET_SHOW_DATE_PICKER':
                    draft.showDatePicker = action.payload;
                    break;

                case 'SET_EDIT_VIEW':
                    draft.editView = action.payload;
                    break;

                case 'EXPAND_VIEW':
                    draft.viewExpanded = true;
                    break;

                default:
                    return draft;
            }
        }),
        getInitialState(task)
    );

    return [
        { ...calculateDerivedState(state, task), ...state },
        dispatch,
    ] as const;
};

function calculateDerivedState(state: State, task: Task | null) {
    /** If should disable saving the changes */
    const disableSave = (() => {
        // No task name provided
        if (state.values.name.length === 0) {
            return true;
        }

        // Task name has not changed
        if (
            task?.name === state.values.name &&
            (task?.description ?? '') === state.values.description
        ) {
            return true;
        }

        return false;
    })();

    return { disableSave };
}
