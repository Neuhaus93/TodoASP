export type Task = {
    /** Unique ID of the task */
    id: string;
    /** Name of the task */
    name: string;
    /** Due date of the task, in unix timestamp */
    due_date: number | null;
    /** Boolean indicating if the task is completed or not */
    completed: boolean;
    /** Unix timestamp indicating when the task was completed, if it is completed */
    completed_at: number | null;
    /** Unix timestamp indicating when the task was created */
    created_at: number;
};

export type Tasks = Task[];
