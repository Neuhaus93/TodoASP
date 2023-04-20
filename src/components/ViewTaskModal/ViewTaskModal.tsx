import DateTimePicker, {
    DatePickerOptions,
} from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect } from 'react';
import {
    Keyboard,
    ModalProps,
    Pressable,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Task } from '../../api/types';
import { useDeleteTask } from '../../api/useDeleteTask';
import { useUpdateTask } from '../../api/useUpdateTask';
import { spacing } from '../../theme';
import { getDateTimestamp } from '../../utils/dateTime';
import { getPriorityInfo } from '../../utils/priority';
import { BackdropModal } from '../Backdrop';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { DescriptionIcon, TrashIcon } from '../Icons';
import FlagIcon from '../Icons/FlagIcon';
import { MyText } from '../MyText';
import { SelectPriorityModal } from '../SelectPriorityModal';
import { TaskDueDate } from '../TaskDueDate';
import Header from './Header';
import { useViewTaskReducer } from './useViewTaskReducer';

export type ViewTaskModalProps = {
    /**
     * Task information, can be null if no task has been pressed yet
     */
    task: Task | null;
    /**
     * Callback fired when the modal is closed
     */
    onClose: () => void;
} & Pick<ModalProps, 'visible'>;

const INITIAL_HEIGHT = 200;

const ViewTaskModal: React.FC<ViewTaskModalProps> = (props) => {
    const { task, visible, onClose } = props;
    const { height: windowHeight } = useWindowDimensions();

    const [
        {
            values,
            showDatePicker,
            showPriorityPicker,
            showDeleteConfirmation,
            editView,
            viewExpanded,
            disableSave,
        },
        dispatch,
    ] = useViewTaskReducer(task);

    const sharedHeight = useSharedValue(INITIAL_HEIGHT);
    const priorityInfo = getPriorityInfo(values.priority);

    const { mutate: updateTask } = useUpdateTask();
    const { mutate: deleteTask } = useDeleteTask();

    // TODO: Make the animation work well in the future. Hard to delay the keyboard opening.
    // const animatedStyles = useAnimatedStyle(() => {
    //     return { height: sharedHeight.value };
    // });

    /**
     * Helper function to expand the modal
     */
    const updateViewExpanded = useCallback(() => {
        dispatch({ type: 'EXPAND_VIEW' });
    }, [dispatch]);

    const handleDateChange: DatePickerOptions['onChange'] = (event, date) => {
        dispatch({ type: 'SET_SHOW_DATE_PICKER', payload: false });

        if (task && event.type === 'set' && date) {
            dispatch({
                type: 'SET_DATE',
                payload: date,
            });

            updateTask({
                id: task.id,
                due_date: getDateTimestamp(date),
            });
        }
    };

    const handleDeleteTask = () => {
        if (!task) {
            return null;
        }

        // Delete the task
        deleteTask(task.id);

        // Close confirmation dialog
        dispatch({
            type: 'SET_SHOW_DELETE_CONFIRMATION',
            payload: false,
        });

        // Close the view modal
        onClose();
    };

    /**
     * Handle deleting the due date of a task
     */
    const handleDateDelete = () => {
        if (task) {
            updateTask({
                id: task.id,
                due_date: null,
            });

            dispatch({
                type: 'SET_DATE',
                payload: null,
            });
        }
    };

    /**
     * Handles saving the changes
     */
    const handleUpdateTask = () => {
        if (!task || disableSave) {
            return;
        }

        updateTask({
            id: task.id,
            name: values.draftName.trim(),
            description: values.draftDescription.trim() || null,
        });

        // Trim state values and go back to view modal
        dispatch({ type: 'TASK_UPDATED' });
    };

    /**
     * Updates the task priority
     */
    const handleUpdatePriority = (newPriority: Task['priority']) => {
        if (!task) {
            return;
        }

        updateTask({
            id: task.id,
            priority: newPriority,
        });

        // Saves the new priority and close the priority picker
        dispatch({ type: 'SET_PRIORITY', payload: newPriority });
    };

    /**
     * Toggles the task completed status
     */
    const handleUpdateCompleted = () => {
        const newValue = !values.completed;

        if (!task) {
            return;
        }

        updateTask({
            id: task.id,
            completed: newValue,
        });

        // Saves the new completed value
        dispatch({ type: 'SET_COMPLETED', payload: newValue });

        // If completing the task, close the modal
        if (newValue) {
            onClose();
        }
    };

    useEffect(() => {
        if (editView && !viewExpanded) {
            sharedHeight.value = withTiming(
                windowHeight,
                {
                    duration: 400,
                    easing: Easing.out(Easing.exp),
                },
                (isFinished) => {
                    if (isFinished) {
                        runOnJS(updateViewExpanded)();
                    }
                }
            );
        }

        // Make sure to dismiss the keyboard if on "View"
        if (!editView) {
            Keyboard.dismiss();
        }
    }, [
        editView,
        sharedHeight,
        updateViewExpanded,
        viewExpanded,
        windowHeight,
    ]);

    // If the keyboard is dismissed on "Edit", return to the "View"
    useEffect(() => {
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            if (editView) {
                dispatch({ type: 'SET_EDIT_VIEW', payload: false });
            }
        });

        return () => {
            hideSubscription.remove();
        };
    }, [editView, dispatch]);

    const handleRequestClose = () => {
        if (editView) {
            dispatch({ type: 'SET_EDIT_VIEW', payload: false });
            return;
        }

        onClose();
    };

    if (!task) {
        return null;
    }

    return (
        <>
            <BackdropModal
                visible={visible}
                onRequestClose={handleRequestClose}
                expanded={viewExpanded}
            >
                <Animated.View>
                    <Header
                        task={task}
                        onDeleteTask={() =>
                            dispatch({
                                type: 'SET_SHOW_DELETE_CONFIRMATION',
                                payload: true,
                            })
                        }
                        editView={editView}
                        editHeaderProps={{
                            disableSave,
                            onBack: () =>
                                dispatch({
                                    type: 'SET_EDIT_VIEW',
                                    payload: false,
                                }),
                            onSave: handleUpdateTask,
                        }}
                    />
                    <Checkbox
                        label={values.draftName}
                        value={values.draftName}
                        onCheck={handleUpdateCompleted}
                        onChangeText={(payload) =>
                            dispatch({ type: 'SET_DRAFT_NAME', payload })
                        }
                        priority={values.priority}
                        checked={values.completed}
                        editable
                        onInputFocus={() =>
                            dispatch({
                                type: 'SET_EDIT_VIEW',
                                payload: true,
                            })
                        }
                    />

                    {(editView || !!values.description) && (
                        <View
                            style={{
                                marginTop: spacing(3.5),
                                marginRight: spacing(2),
                                flexDirection: 'row',
                            }}
                        >
                            <DescriptionIcon
                                style={{ marginTop: spacing(0.5) }}
                            />
                            <TextInput
                                multiline
                                value={values.draftDescription}
                                onChangeText={(payload) =>
                                    dispatch({
                                        type: 'SET_DRAFT_DESCRIPTION',
                                        payload,
                                    })
                                }
                                maxLength={200}
                                placeholder="Description"
                                onFocus={() =>
                                    dispatch({
                                        type: 'SET_EDIT_VIEW',
                                        payload: true,
                                    })
                                }
                                style={{
                                    marginLeft: spacing(2),
                                    width: '100%',
                                    flexShrink: 1,
                                }}
                            />
                        </View>
                    )}

                    {!editView && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: spacing(4),
                            }}
                        >
                            <Pressable
                                onPress={() =>
                                    dispatch({
                                        type: 'SET_SHOW_DATE_PICKER',
                                        payload: true,
                                    })
                                }
                            >
                                <TaskDueDate
                                    dueDate={getDateTimestamp(values.date)}
                                    size="lg"
                                    defaultColorText
                                />
                            </Pressable>
                            {!!values.date && (
                                <Pressable
                                    style={{
                                        marginLeft: spacing(2),
                                    }}
                                    onPress={handleDateDelete}
                                >
                                    <TrashIcon width="20" height="20" />
                                </Pressable>
                            )}
                        </View>
                    )}

                    {!editView && values.priority !== 4 && (
                        <Pressable
                            onPress={() =>
                                dispatch({
                                    type: 'SET_SHOW_PRIORITY_PICKER',
                                    payload: true,
                                })
                            }
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: spacing(4),
                            }}
                        >
                            <FlagIcon fill={priorityInfo.color} />
                            <MyText style={{ marginLeft: spacing(2) }}>
                                {priorityInfo.labelLong}
                            </MyText>
                        </Pressable>
                    )}

                    {!editView && values.priority === 4 && (
                        <Button
                            variant="soft"
                            style={{ marginTop: spacing(4) }}
                            onPress={() =>
                                dispatch({
                                    type: 'SET_SHOW_PRIORITY_PICKER',
                                    payload: true,
                                })
                            }
                        >
                            <FlagIcon outline width="17" height="18" />
                            <MyText
                                style={{
                                    marginLeft: spacing(1),
                                }}
                            >
                                Priority
                            </MyText>
                        </Button>
                    )}
                </Animated.View>

                {showDatePicker && (
                    <DateTimePicker
                        value={values.date || new Date()}
                        onChange={handleDateChange}
                    />
                )}
            </BackdropModal>

            <SelectPriorityModal
                visible={showPriorityPicker}
                priority={values.priority}
                onPriorityChange={handleUpdatePriority}
                onRequestClose={() =>
                    dispatch({
                        type: 'SET_SHOW_PRIORITY_PICKER',
                        payload: false,
                    })
                }
            />

            <ConfirmationModal
                visible={showDeleteConfirmation}
                title="Delete task?"
                description={`This will permanently delete "${values.name}" and can't be undone.`}
                onDismiss={() =>
                    dispatch({
                        type: 'SET_SHOW_DELETE_CONFIRMATION',
                        payload: false,
                    })
                }
                onConfirm={handleDeleteTask}
            />
        </>
    );
};

export default ViewTaskModal;
