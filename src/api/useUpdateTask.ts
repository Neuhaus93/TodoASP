import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import type { Task, Tasks } from './types';

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
            const tasks = queryClient.getQueryData<Tasks>(['tasks']);

            try {
                await AsyncStorage.setItem('@all_tasks', JSON.stringify(tasks));
            } catch (e) {
                console.log(e);
            }
        },
        onMutate: async (updatedTask) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData<Tasks>(['tasks']);

            // Optimistically update to the new value
            queryClient.setQueryData<Tasks>(['tasks'], (old) => {
                const arr = old ?? [];

                return arr.map((task) => {
                    if (task.id === updatedTask.id) {
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
            queryClient.setQueryData(['tasks'], context?.previousTasks);
        },
    });
};

export { useUpdateTask };
