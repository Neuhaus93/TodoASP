import DateTimePicker, {
    DatePickerOptions,
} from '@react-native-community/datetimepicker';
import { useMemo, useRef, useState } from 'react';
import {
    Modal,
    ModalProps,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { useCreateTask } from '../api/useCreateTask';
import { Backdrop, Divider, MyText } from '../components';
import { CalendarIcon, SendIcon, TrashIcon } from '../components/Icons';
import { colors, spacing } from '../theme';
import { getDateTimestamp, getTimestampInfo } from '../utils/dateTime';

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
    const [noDate, setNoDate] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const saveDisabled = taskName.length === 0;

    const { mutate } = useCreateTask();

    const dateInfo: ReturnType<typeof getTimestampInfo> = useMemo(() => {
        if (noDate || !date) {
            return {
                label: 'Due Date',
                color: colors.date.future,
            };
        }

        return getTimestampInfo(getDateTimestamp(date));
    }, [noDate, date]);

    const onShowModal = () => {
        taskNameInputRef.current?.focus();
    };

    const handleDateChange: DatePickerOptions['onChange'] = (event, date) => {
        setShowDatePicker(false);

        if (event.type === 'set' && date) {
            setNoDate(false);
            setDate(date);
        }
    };

    const handleDateDelete = () => {
        setNoDate(true);
        setDate(new Date());
    };

    const handleTaskCreate = () => {
        mutate({
            name: taskName,
            due_date: noDate || !date ? null : getDateTimestamp(date),
        });
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onShow={onShowModal}
            onRequestClose={onClose}
        >
            <Backdrop onClose={onClose}>
                <Pressable style={styles.container}>
                    <View>
                        <TextInput
                            ref={taskNameInputRef}
                            style={{ fontSize: 20 }}
                            placeholder="Task name"
                            value={taskName}
                            onChangeText={setTaskName}
                        />
                        <View
                            style={{
                                marginTop: spacing(4),
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Pressable
                                style={styles.dueDateBtn}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <CalendarIcon
                                    width="16"
                                    height="16"
                                    fill={dateInfo?.color}
                                />
                                <MyText
                                    style={{
                                        marginLeft: spacing(1),
                                        color: dateInfo?.color,
                                    }}
                                >
                                    {dateInfo?.label}
                                </MyText>
                            </Pressable>

                            {!noDate && (
                                <Pressable
                                    style={styles.deleteButton}
                                    onPress={handleDateDelete}
                                >
                                    <TrashIcon
                                        width="20"
                                        height="20"
                                        fill={colors.icon}
                                    />
                                </Pressable>
                            )}
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
                                <SendIcon
                                    height="20"
                                    width="20"
                                    fill={'white'}
                                />
                            </View>
                        </Pressable>
                    </View>
                </Pressable>
            </Backdrop>

            {showDatePicker && (
                <DateTimePicker value={date} onChange={handleDateChange} />
            )}
        </Modal>
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

export default CreateTaskModal;
