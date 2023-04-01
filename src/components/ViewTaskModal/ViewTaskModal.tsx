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
import { useUpdateTask } from '../../api/useUpdateTask';
import { spacing } from '../../theme';
import { getDateTimestamp } from '../../utils/dateTime';
import { getPriorityInfo } from '../../utils/priority';
import { BackdropModal } from '../Backdrop';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
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
            editView,
            viewExpanded,
            disableSave,
        },
        dispatch,
    ] = useViewTaskReducer(task);

    const sharedHeight = useSharedValue(INITIAL_HEIGHT);
    const priorityInfo = getPriorityInfo(values.priority);

    const { mutate } = useUpdateTask();

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

            mutate({
                id: task.id,
                due_date: getDateTimestamp(date),
            });
        }
    };

    /**
     * Handle deleting the due date of a task
     */
    const handleDateDelete = () => {
        if (task) {
            mutate({
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

        mutate({
            id: task.id,
            name: values.name.trim(),
            description: values.description.trim() || null,
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

        mutate({
            id: task.id,
            priority: newPriority,
        });

        // Saves the new priority and close the priority picker
        dispatch({ type: 'SET_PRIORITY', payload: newPriority });
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
                        label={values.name}
                        value={values.name}
                        onChangeText={(payload) =>
                            dispatch({ type: 'SET_NAME', payload })
                        }
                        priority={task.priority}
                        checked={task.completed}
                        editable
                        onInputFocus={() =>
                            dispatch({
                                type: 'SET_EDIT_VIEW',
                                payload: true,
                            })
                        }
                    />

                    {(editView || task?.description) && (
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
                                value={values.description}
                                onChangeText={(payload) =>
                                    dispatch({
                                        type: 'SET_DESCRIPTION',
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
        </>
    );
};

export default ViewTaskModal;
