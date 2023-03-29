import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import uuid from 'react-native-uuid';
import { getCurrentTimestamp } from '../utils/dateTime';
import { queryClient } from './queryClient';
import type { Task, Tasks } from './types';

type CreateTaskArgs = Pick<Task, 'name' | 'due_date'>;

const useCreateTask = () => {
    return useMutation({
        mutationFn: async (task: CreateTaskArgs) => {
            const previousTasks = queryClient.getQueryData<Tasks>(['tasks']);
            const newTask = buildFinalTask(task);

            try {
                await AsyncStorage.setItem(
                    '@all_tasks',
                    JSON.stringify([...(previousTasks || []), newTask])
                );
            } catch (e) {
                console.log(e);
            }
        },
        onMutate: async (task) => {
            const newTask = buildFinalTask(task);

            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData<Tasks>(['tasks']);

            // Optimistically update to the new value
            queryClient.setQueryData<Tasks>(['tasks'], (old) => [
                ...(old || []),
                newTask,
            ]);

            // Return a context object with the snapshotted value
            return { previousTasks };
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['tasks'], context?.previousTasks);
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

export { useCreateTask };
