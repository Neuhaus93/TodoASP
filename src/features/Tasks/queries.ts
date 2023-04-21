import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { Tasks } from '../../api/types';

const taskKeys = {
    all: ['tasks'] as const,
    list: () => [...taskKeys.all, 'list'] as const,
};

const useTasks = () => {
    return useQuery<Tasks>({
        queryKey: taskKeys.list(),
        queryFn: async () => {
            let allTasks = [] as Tasks;

            try {
                const value = await AsyncStorage.getItem('@all_tasks');

                if (value !== null) {
                    allTasks = JSON.parse(value);
                }
            } catch (e) {
                console.log(e);
            }

            return allTasks;
        },
    });
};

export { taskKeys, useTasks };
