import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Task } from '../../src/api/types';
import { MyText, TaskItem } from '../../src/components';
import { EmptyState } from '../../src/components/EmptyState';
import { useUpdateTask } from '../../src/features/Tasks/mutations';
import { useTasks } from '../../src/features/Tasks/queries';
import { useStore } from '../../src/store';
import { spacing } from '../../src/theme';

export default function InboxPage() {
    const { data: tasksData } = useTasks();
    const { mutate: updateTask } = useUpdateTask();

    const showCompleted = useStore(
        (state) => state.displaySettings.showCompleted
    );
    const openViewTaskModal = useStore((state) => state.openViewTaskModal);
    const setShowCompleted = useStore((state) => state.setShowCompleted);

    // Reset show completed tasks boolean when leaving the inbox page
    useEffect(() => {
        return () => setShowCompleted(false);
    }, [setShowCompleted]);

    // Filtered and sorted tasks
    const tasks = useMemo(() => {
        if (!Array.isArray(tasksData)) {
            return [];
        }

        const res = tasksData
            // Hide or show completed tasks
            .filter((task) => {
                if (!showCompleted) {
                    return !task.completed;
                }

                return true;
            })
            // Completed tasks last
            .sort((_, b) => (b.completed ? -1 : 0));

        return res;
    }, [tasksData, showCompleted]);

    const handleToggleTaskCompleted = (task: Task) => {
        updateTask({
            id: task.id,
            completed: !task.completed,
        });
    };

    if (tasks.length === 0) {
        return <EmptyState />;
    }

    return (
        <ScrollView style={{ paddingLeft: spacing(5) }}>
            <ClearCache />
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onPress={openViewTaskModal}
                    onToggleComplete={handleToggleTaskCompleted}
                />
            ))}
        </ScrollView>
    );
}

// TODO: Remove this helper component in the future
const ClearCache: React.FC<{ visible?: boolean }> = ({ visible = false }) => {
    if (!visible) {
        return null;
    }

    return (
        <Pressable onPress={() => AsyncStorage.clear()}>
            <MyText>Clear Cache</MyText>
        </Pressable>
    );
};
