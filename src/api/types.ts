export type Task = {
    /** Unique ID of the task */
    id: string;
    /** Name of the task */
    name: string;
    /** Description of the task */
    description: string | null;
    /** Due date of the task, in unix timestamp */
    due_date: number | null;
    /** Task priority. Priority 4 means no priority */
    priority: 1 | 2 | 3 | 4;
    /** Boolean indicating if the task is completed or not */
    completed: boolean;
    /** Unix timestamp indicating when the task was completed, if it is completed */
    completed_at: number | null;
    /** Unix timestamp indicating when the task was created */
    created_at: number;
};

export type Tasks = Task[];
