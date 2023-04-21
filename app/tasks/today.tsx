import { useMemo } from 'react';
import { View } from 'react-native';
import { Task } from '../../src/api/types';
import { TaskItem } from '../../src/components';
import { useUpdateTask } from '../../src/features/Tasks/mutations';
import { useTasks } from '../../src/features/Tasks/queries';
import { useStore } from '../../src/store';
import { spacing } from '../../src/theme';
import { getTimestampDayDiffFromToday } from '../../src/utils/dateTime';

export default function TodayPage() {
    const { data: tasksData } = useTasks();
    const { mutate: updateTask } = useUpdateTask();

    const openViewTaskModal = useStore((state) => state.openViewTaskModal);

    const tasks = useMemo(() => {
        return (tasksData || []).filter((task) => {
            const dayDiff = getTimestampDayDiffFromToday(task.due_date);

            // Don't show tasks:
            // - Without due date
            // - Due date longer than today
            // - Completed tasks
            if (dayDiff === null || dayDiff > 0 || task.completed) {
                return false;
            }

            return true;
        });
    }, [tasksData]);

    const handleToggleTaskCompleted = (task: Task) => {
        updateTask({
            id: task.id,
            completed: !task.completed,
        });
    };

    return (
        <View style={{ paddingLeft: spacing(5) }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onPress={openViewTaskModal}
                    onToggleComplete={handleToggleTaskCompleted}
                />
            ))}
        </View>
    );
}
