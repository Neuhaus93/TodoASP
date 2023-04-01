import DateTimePicker, {
    DatePickerOptions,
} from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import {
    ModalProps,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { Task } from '../../api/types';
import { useCreateTask } from '../../api/useCreateTask';
import { colors, spacing } from '../../theme';
import { getDateTimestamp } from '../../utils/dateTime';
import { BackdropModal } from '../Backdrop';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { SendIcon, TrashIcon } from '../Icons';
import FlagIcon from '../Icons/FlagIcon';
import { MyText } from '../MyText';
import { SelectPriorityModal } from '../SelectPriorityModal';
import { TaskDueDate } from '../TaskDueDate';

export type CreateTaskModalProps = {
    /**
     * Callback fired when the modal is closed
     */
    onClose: () => void;
} & Pick<ModalProps, 'visible'>;

const CreateTaskModal: React.FC<CreateTaskModalProps> = (props) => {
    const { visible, onClose } = props;
    const taskNameInputRef = useRef<TextInput>(null);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState<Task['priority']>(4);
    const [noDate, setNoDate] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPriorityPicker, setShowPriorityPicker] = useState(false);
    const saveDisabled = taskName.length === 0;

    const { mutate } = useCreateTask();

    const priorityInfo = getPriorityInfo(priority);

    /**
     * Focus the task name input on opening the modal. Wait a bit to prevent if from not opening
     */
    const onShowModal = () => {
        setTimeout(() => {
            taskNameInputRef.current?.focus();
        }, 20);
    };

    /**
     * Handles changes on the due date, when changing to an existing date
     */
    const handleDateChange: DatePickerOptions['onChange'] = (event, date) => {
        setShowDatePicker(false);

        if (event.type === 'set' && date) {
            setNoDate(false);
            setDate(date);
        }
    };

    /**
     * Handles removing the due date from the task
     */
    const handleDateDelete = () => {
        setNoDate(true);
        setDate(new Date());
    };

    /**
     * Creates a task and closes the modal
     */
    const handleTaskCreate = () => {
        mutate({
            name: taskName,
            description: taskDescription ? taskDescription : null,
            due_date: noDate || !date ? null : getDateTimestamp(date),
            priority,
        });
        onClose();
    };

    return (
        <>
            <BackdropModal
                visible={visible}
                onShow={onShowModal}
                onRequestClose={onClose}
            >
                <View>
                    <TextInput
                        ref={taskNameInputRef}
                        style={{ fontSize: 20 }}
                        placeholder="Task name"
                        value={taskName}
                        onChangeText={setTaskName}
                    />
                    <TextInput
                        multiline
                        numberOfLines={1}
                        maxLength={200}
                        style={{ marginTop: spacing(3), fontSize: 18 }}
                        placeholder="Description"
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                    />
                    <View
                        style={{
                            marginTop: spacing(4),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Button onPress={() => setShowDatePicker(true)}>
                            <TaskDueDate
                                dueDate={noDate ? null : getDateTimestamp(date)}
                            />
                        </Button>

                        {!noDate && (
                            <Pressable
                                style={styles.deleteButton}
                                onPress={handleDateDelete}
                            >
                                <TrashIcon width="20" height="20" />
                            </Pressable>
                        )}

                        <Button
                            style={{ marginLeft: spacing(2) }}
                            onPress={() => setShowPriorityPicker(true)}
                        >
                            <FlagIcon
                                outline={priority === 4}
                                width="17"
                                height="17"
                                fill={priorityInfo.color}
                            />
                            <MyText
                                color="secondary"
                                style={{
                                    marginLeft: spacing(1),
                                    fontSize: 12,
                                    color: priorityInfo.color,
                                }}
                            >
                                {priorityInfo.label}
                            </MyText>
                        </Button>
                    </View>
                </View>
                <View style={{ marginVertical: spacing(3) }}>
                    <Divider />
                </View>
                <View>
                    <Pressable
                        disabled={saveDisabled}
                        onPress={handleTaskCreate}
                    >
                        <View
                            style={[
                                styles.iconButton,
                                saveDisabled
                                    ? undefined
                                    : styles.iconButtonActive,
                            ]}
                        >
                            <SendIcon height="20" width="20" fill={'white'} />
                        </View>
                    </Pressable>
                </View>

                {showDatePicker && (
                    <DateTimePicker value={date} onChange={handleDateChange} />
                )}
            </BackdropModal>

            <SelectPriorityModal
                visible={showPriorityPicker}
                onRequestClose={() => setShowPriorityPicker(false)}
                priority={priority}
                onPriorityChange={setPriority}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: spacing(4),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dueDateBtn: {
        borderWidth: 1,
        borderColor: colors.divider,
        borderRadius: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    iconButton: {
        width: 40,
        height: 36,
        borderRadius: 8,
        backgroundColor: colors.disabled,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    iconButtonActive: {
        backgroundColor: colors.menus,
    },
    deleteButton: {
        marginLeft: spacing(2),
    },
});

function getPriorityInfo(priority: Task['priority']) {
    switch (priority) {
        case 1:
            return {
                label: 'P1',
                color: colors.priority.high.main,
            };
        case 2:
            return {
                label: 'P2',
                color: colors.priority.medium.main,
            };
        case 3:
            return {
                label: 'P3',
                color: colors.priority.low.main,
            };
        case 4:
            return {
                label: 'Priority',
                color: colors.icon,
            };
    }
}

export default CreateTaskModal;
