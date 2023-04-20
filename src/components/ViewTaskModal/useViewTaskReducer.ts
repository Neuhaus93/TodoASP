import produce from 'immer';
import { useReducer } from 'react';
import { Task } from '../../api/types';

const getInitialState = (task: Task | null) => ({
    values: {
        completed: task?.completed || false,
        draftName: task?.name || '',
        name: task?.name || '',
        description: task?.description || '',
        draftDescription: task?.description || '',
        date: task?.due_date ? new Date(task.due_date * 1000) : null,
        priority: task?.priority || 4,
    },
    showDatePicker: false,
    showPriorityPicker: false,
    showDeleteConfirmation: false,
    editView: false,
    viewExpanded: false,
});

type State = ReturnType<typeof getInitialState>;
type Action =
    | { type: 'SET_COMPLETED'; payload: boolean }
    | { type: 'SET_DRAFT_NAME'; payload: string }
    | { type: 'SET_DRAFT_DESCRIPTION'; payload: string }
    | { type: 'SET_DATE'; payload: Date | null }
    | { type: 'SET_PRIORITY'; payload: Task['priority'] }
    | { type: 'TASK_UPDATED' }
    | { type: 'SET_SHOW_DATE_PICKER'; payload: boolean }
    | { type: 'SET_SHOW_PRIORITY_PICKER'; payload: boolean }
    | { type: 'SET_SHOW_DELETE_CONFIRMATION'; payload: boolean }
    | { type: 'SET_EDIT_VIEW'; payload: boolean }
    | { type: 'EXPAND_VIEW' };

export const useViewTaskReducer = (task: Task | null) => {
    const [state, dispatch] = useReducer(
        produce((draft: State, action: Action) => {
            switch (action.type) {
                case 'SET_COMPLETED':
                    draft.values.completed = action.payload;
                    break;

                case 'SET_DRAFT_NAME':
                    draft.values.draftName = action.payload;
                    break;

                case 'SET_DRAFT_DESCRIPTION':
                    draft.values.draftDescription = action.payload;
                    break;

                case 'SET_DATE':
                    draft.values.date = action.payload;
                    break;

                case 'SET_PRIORITY':
                    draft.values.priority = action.payload;
                    draft.showPriorityPicker = false;
                    break;

                case 'TASK_UPDATED': {
                    const name = draft.values.draftName.trim();
                    const description = draft.values.draftDescription.trim();

                    draft.values.name = name;
                    draft.values.draftName = name;
                    draft.values.description = description;
                    draft.values.draftDescription = description;
                    draft.editView = false;
                    break;
                }

                case 'SET_SHOW_DATE_PICKER':
                    draft.showDatePicker = action.payload;
                    break;

                case 'SET_SHOW_PRIORITY_PICKER':
                    draft.showPriorityPicker = action.payload;
                    break;

                case 'SET_SHOW_DELETE_CONFIRMATION':
                    draft.showDeleteConfirmation = action.payload;
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

    return [{ ...calculateDerivedState(state), ...state }, dispatch] as const;
};

function calculateDerivedState(state: State) {
    /** If should disable saving the changes */
    const disableSave = (() => {
        // No task name provided
        if (state.values.name.length === 0) {
            return true;
        }

        // Task name and description has not changed
        if (
            state.values.draftName === state.values.name &&
            state.values.draftDescription === state.values.description
        ) {
            return true;
        }

        return false;
    })();

    return { disableSave };
}
