import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Task, Tasks } from '../src/api/types';
import { useTasks } from '../src/api/useTasks';
import { useUpdateTask } from '../src/api/useUpdateTask';
import { MyText, TaskItem } from '../src/components';
import { CreateTaskModal } from '../src/components/CreateTaskModal';
import { MoreVerticalIcon } from '../src/components/Icons';
import { ViewTaskModal } from '../src/components/ViewTaskModal';
import { useInboxStateReducer } from '../src/hooks/reducers/useInboxStateReducer';
import { colors, spacing } from '../src/theme';

const windowDimensions = Dimensions.get('window');
const footerMidSectionWidth = 54;
const footerSideSectionWidth =
    (windowDimensions.width - footerMidSectionWidth) / 2;
const footerHeight = footerMidSectionWidth;
const addBtnRadius = footerMidSectionWidth / 2 - 2;

export default function HomePage() {
    const [{ dialogs }, dispatch] = useInboxStateReducer();

    const { data: tasks } = useTasks();
    const { mutate } = useUpdateTask();

    // Getst the viewing task given the ID and the task array
    const viewTask = useMemo(() => {
        return findTask(dialogs.viewTask.taskId, tasks);
    }, [tasks, dialogs.viewTask.taskId]);

    const handleToggleTaskCompleted = (task: Task) => {
        mutate({
            id: task.id,
            completed: !task.completed,
        });
    };

    const handlePlusButtonPress = () => {
        dispatch({ type: 'CREATE_TASK_OPEN' });
    };

    const handleCloseCreateTaskModal = () => {
        dispatch({ type: 'CREATE_TASK_CLOSE' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MyText style={{ fontWeight: 'bold', fontSize: 20 }}>
                    Inbox
                </MyText>
                <MoreVerticalIcon />
            </View>
            <ScrollView style={styles.main}>
                <ClearCache />
                {Array.isArray(tasks) && (
                    <>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onPress={(task) =>
                                    dispatch({
                                        type: 'VIEW_TASK_OPEN',
                                        payload: task.id,
                                    })
                                }
                                onToggleComplete={handleToggleTaskCompleted}
                            />
                        ))}
                    </>
                )}
            </ScrollView>
            <View style={styles.footer}>
                <View
                    style={[
                        styles.footerSideSection,
                        { borderTopRightRadius: 12 },
                    ]}
                />
                <View
                    style={{
                        width: footerMidSectionWidth,
                        position: 'relative',
                    }}
                >
                    <Svg
                        width={footerMidSectionWidth}
                        height={footerMidSectionWidth}
                        viewBox="0 0 3 3"
                        fill={colors.menus}
                    >
                        <Path d="M -0.1 0.05 L 0 3 L 3 3 L 3.1 0.05 C 3 2 0 2 -0.1 0.05" />
                    </Svg>
                    <Pressable
                        onPress={handlePlusButtonPress}
                        style={{
                            position: 'absolute',
                            left: footerMidSectionWidth / 2 - addBtnRadius,
                            top: -addBtnRadius - 2,
                        }}
                    >
                        <View style={styles.addBtnContainer}>
                            <Svg
                                fill={colors.background}
                                width={18}
                                height={18}
                                viewBox="0 0 24 24"
                            >
                                <Path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
                            </Svg>
                        </View>
                    </Pressable>
                </View>
                <View
                    style={[
                        styles.footerSideSection,
                        { borderTopLeftRadius: 12 },
                    ]}
                />
            </View>

            <CreateTaskModal
                key={dialogs.createTask.key}
                visible={dialogs.createTask.open}
                onClose={handleCloseCreateTaskModal}
            />

            <ViewTaskModal
                key={dialogs.viewTask.key}
                visible={dialogs.viewTask.open}
                task={viewTask}
                onClose={() => dispatch({ type: 'VIEW_TASK_CLOSE' })}
            />
        </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
    },
    header: {
        paddingHorizontal: spacing(5),
        paddingVertical: spacing(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    main: {
        flex: 1,
        paddingLeft: spacing(5),
    },
    footer: {
        flexDirection: 'row',
        height: footerHeight,
    },
    footerSideSection: {
        width: footerSideSectionWidth,
        backgroundColor: colors.menus,
    },
    addBtnContainer: {
        width: addBtnRadius * 2,
        height: addBtnRadius * 2,
        backgroundColor: colors.menus,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,

        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

/**
 * Getst the viewing task given the ID and the task array
 */
function findTask(
    taskId: Task['id'] | null,
    tasks: Tasks | undefined
): Task | null {
    if (!tasks || !taskId) {
        return null;
    }

    const task = tasks.find((el) => el.id === taskId);

    if (!task) {
        return null;
    }

    return task;
}
