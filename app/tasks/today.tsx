import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Task, Tasks } from '../../src/api/types';
import { Divider, MyText, TaskItem } from '../../src/components';
import { EmptyState } from '../../src/components/EmptyState';
import { ArrowDownwardIcon } from '../../src/components/Icons';
import { useUpdateTask } from '../../src/features/Tasks/mutations';
import { useTasks } from '../../src/features/Tasks/queries';
import { useStore } from '../../src/store';
import { spacing } from '../../src/theme';
import { getTimestampDayDiffFromToday } from '../../src/utils/dateTime';

export default function TodayPage() {
    const { data: tasksData } = useTasks();
    const { mutate: updateTask } = useUpdateTask();

    const [hideOverdue, setHideOverdue] = useState(false);

    const openViewTaskModal = useStore((state) => state.openViewTaskModal);

    const { overdueTasks, todayTasks, empty } = useMemo(() => {
        const overdueTasks: Tasks = [];
        const todayTasks: Tasks = [];

        (tasksData || []).forEach((task) => {
            const dayDiff = getTimestampDayDiffFromToday(task.due_date);

            if (task.completed || dayDiff === null) {
                return;
            }

            if (dayDiff < 0) {
                overdueTasks.push(task);
            } else if (dayDiff === 0) {
                todayTasks.push(task);
            }
        });

        return {
            overdueTasks,
            todayTasks,
            empty: overdueTasks.length === 0 && todayTasks.length === 0,
        };
    }, [tasksData]);

    // If no overdue tasks, make sure to reset hideOverdue to false, just in case
    useEffect(() => {
        if (overdueTasks.length === 0) {
            setHideOverdue(false);
        }
    }, [overdueTasks]);

    const handleToggleTaskCompleted = (task: Task) => {
        updateTask({
            id: task.id,
            completed: !task.completed,
        });
    };

    const handleToggleShowOverdue = () => {
        setHideOverdue(!hideOverdue);
    };

    if (empty) {
        return <EmptyState />;
    }

    return (
        <ScrollView>
            {overdueTasks.length > 0 && (
                <View style={styles.sectionRoot}>
                    <Pressable
                        onPress={handleToggleShowOverdue}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginRight: spacing(4),
                        }}
                    >
                        <MyText style={styles.sectionLabel}>Overdue</MyText>
                        <ArrowDownwardIcon
                            width={20}
                            style={{
                                transform: [
                                    {
                                        rotateZ: hideOverdue
                                            ? '180deg'
                                            : '0deg',
                                    },
                                ],
                            }}
                        />
                    </Pressable>
                    <Divider />
                    {!hideOverdue && (
                        <View style={styles.sectionList}>
                            {overdueTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onPress={openViewTaskModal}
                                    onToggleComplete={handleToggleTaskCompleted}
                                />
                            ))}
                        </View>
                    )}
                </View>
            )}

            {!empty && (
                <View style={styles.sectionRoot}>
                    <MyText
                        style={styles.sectionLabel}
                        color={todayTasks.length > 0 ? 'primary' : 'secondary'}
                    >
                        {dayjs().format('MMM  D')} · Today
                    </MyText>
                    <Divider />
                    <View style={styles.sectionList}>
                        {todayTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                hideDate
                                onPress={openViewTaskModal}
                                onToggleComplete={handleToggleTaskCompleted}
                            />
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sectionRoot: {
        marginTop: spacing(5),
    },
    sectionLabel: {
        marginLeft: spacing(4),
        marginBottom: spacing(3),
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionList: {
        marginLeft: spacing(4),
    },
});
