import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import uuid from 'react-native-uuid';
import { queryClient } from '../../api/queryClient';
import { Task, Tasks } from '../../api/types';
import { getCurrentTimestamp } from '../../utils/dateTime';
import { taskKeys } from './queries';

type CreateTaskArgs = Pick<
    Task,
    'name' | 'due_date' | 'description' | 'priority'
>;

const useCreateTask = () => {
    return useMutation<unknown, unknown, CreateTaskArgs>({
        mutationFn: async () => {
            // Since we are using onMutate to optimistically update the cache, which runs
            // BEFORE the mutation function itself, we don't need to add it again in this case
            const tasks = queryClient.getQueryData<Tasks>(taskKeys.list());

            try {
                await AsyncStorage.setItem('@all_tasks', JSON.stringify(tasks));
            } catch (e) {
                console.log(e);
            }
        },
        onMutate: async (task) => {
            const newTask = buildFinalTask(task);

            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: taskKeys.list() });

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData<Tasks>(
                taskKeys.list()
            );

            // Optimistically update to the new value
            queryClient.setQueryData<Tasks>(taskKeys.list(), (old) => [
                ...(old || []),
                newTask,
            ]);

            // Return a context object with the snapshotted value
            return { previousTasks };
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData(taskKeys.list(), context?.previousTasks);
        },
    });
};

function buildFinalTask(partialTask: CreateTaskArgs): Task {
    return {
        ...partialTask,
        id: uuid.v4() as string,
        completed: false,
        completed_at: null,
        created_at: getCurrentTimestamp(),
    };
}

type DeleteTaskArgs = Task['id'];

const useDeleteTask = () => {
    return useMutation<unknown, unknown, DeleteTaskArgs>({
        mutationFn: async () => {
            // Since we are using onMutate to optimistically update the cache, which runs
            // BEFORE the mutation function itself, we don't need to add it again in this case
            const tasks = queryClient.getQueryData<Tasks>(taskKeys.list());

            try {
                await AsyncStorage.setItem('@all_tasks', JSON.stringify(tasks));
            } catch (e) {
                console.log(e);
            }
        },
        onMutate: async (id) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: taskKeys.list() });

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData<Tasks>(
                taskKeys.list()
            );

            // Optimistically update to the new value
            queryClient.setQueryData<Tasks>(taskKeys.list(), (old) => {
                const arr = old ?? [];

                return arr.filter((task) => task.id !== id);
            });

            // Return a context object with the snapshotted value
            return { previousTasks };
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData(taskKeys.list(), context?.previousTasks);
        },
    });
};

type UpdateTaskArgs = Pick<Task, 'id'> &
    Partial<
        Pick<
            Task,
            'name' | 'description' | 'due_date' | 'priority' | 'completed'
        >
    >;

const useUpdateTask = () => {
    return useMutation<unknown, unknown, UpdateTaskArgs>({
        mutationFn: async () => {
            // Since we are using onMutate to optimistically update the cache, which runs
            // BEFORE the mutation function itself, we don't need to add it again in this case
            const tasks = queryClient.getQueryData<Tasks>(taskKeys.list());

            try {
                await AsyncStorage.setItem('@all_tasks', JSON.stringify(tasks));
            } catch (e) {
                console.log(e);
            }
        },
        onMutate: async (updatedTask) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: taskKeys.list() });

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData<Tasks>(
                taskKeys.list()
            );

            // Optimistically update to the new value
            queryClient.setQueryData<Tasks>(taskKeys.list(), (old) => {
                const arr = old ?? [];

                return arr.map((task) => {
                    if (task.id === updatedTask.id) {
                        if (typeof updatedTask.completed === 'boolean') {
                            // If completing a task, add the `completed_at` timestamp.
                            // If unchecking it as completed, remove the timestamp
                            return {
                                ...task,
                                ...updatedTask,
                                completed_at: updatedTask.completed
                                    ? getCurrentTimestamp()
                                    : null,
                            };
                        }

                        return { ...task, ...updatedTask };
                    }

                    return task;
                });
            });

            // Return a context object with the snapshotted value
            return { previousTasks };
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData(taskKeys.list(), context?.previousTasks);
        },
    });
};

export { useCreateTask, useDeleteTask, useUpdateTask };
