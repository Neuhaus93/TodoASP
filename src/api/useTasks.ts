import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tasks } from './types';

const useTasks = () => {
    return useQuery<Tasks>({
        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                const value = await AsyncStorage.getItem('@all_tasks');

                if (value !== null) {
                    return JSON.parse(value);
                }

                return [];
            } catch (e) {
                console.log(e);
                return [];
            }
        },
    });
};

export { useTasks };
