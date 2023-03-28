import { useRef, useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Divider, Text } from '../components';
import { CalendarIcon, SendIcon } from '../components/Icons';
import { colors, spacing } from '../theme';

export type CreateTaskModalProps = {
    visible: boolean;
    onClose: () => void;
};

const CreateTaskModal: React.FC<CreateTaskModalProps> = (props) => {
    const { visible, onClose } = props;
    const taskNameInputRef = useRef<TextInput>(null);
    const [taskName, setTaskName] = useState('');
    const saveDisabled = taskName.length === 0;

    const onShowModal = () => {
        taskNameInputRef.current?.focus();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onShow={onShowModal}
        >
            <TouchableWithoutFeedback onPressOut={onClose}>
                <View style={styles.root}>
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            <View>
                                <TextInput
                                    ref={taskNameInputRef}
                                    style={{ fontSize: 20 }}
                                    placeholder="Task name"
                                    value={taskName}
                                    onChangeText={setTaskName}
                                />
                                <View>
                                    <Pressable style={styles.dueDateBtn}>
                                        <CalendarIcon
                                            width="16"
                                            height="16"
                                            fill="black"
                                        />
                                        <Text
                                            style={{ marginLeft: spacing(1) }}
                                        >
                                            Due date
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ marginVertical: spacing(3) }}>
                                <Divider />
                            </View>
                            <View>
                                <Pressable disabled={saveDisabled}>
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
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        backgroundColor: colors.background,
        padding: spacing(4),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dueDateBtn: {
        marginTop: spacing(4),
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
});

export default CreateTaskModal;
