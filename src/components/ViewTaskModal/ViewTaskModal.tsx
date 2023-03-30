import { useEffect, useState } from 'react';
import {
    Dimensions,
    Modal,
    ModalProps,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { Backdrop } from '../Backdrop';
import { Checkbox } from '../Checkbox';
import { ArrowBackIcon, InboxIcon, MoreVerticalIcon } from '../Icons';
import { MyText } from '../MyText';
import { TaskDueDate } from '../TaskDueDate';

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

const windowDimensions = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;

const INITIAL_HEIGHT = 200;

const ViewTaskModal: React.FC<ViewTaskModalProps> = (props) => {
    const { task, visible, onClose } = props;
    const { height: windowHeight } = useWindowDimensions();
    const [editView, setEditView] = useState(false);

    const sharedHeight = useSharedValue(INITIAL_HEIGHT);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: sharedHeight.value,
        };
    });

    useEffect(() => {
        if (editView) {
            sharedHeight.value = withTiming(windowHeight, {
                duration: 400,
                easing: Easing.out(Easing.exp),
            });
        }
    }, [editView]);

    if (!task) {
        return null;
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Backdrop onClose={onClose}>
                <Pressable
                    onPress={() => {
                        setEditView(true);
                    }}
                >
                    <Animated.View style={[styles.container, animatedStyles]}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: spacing(4),
                            }}
                        >
                            {editView ? (
                                <EditHeader onBack={() => setEditView(false)} />
                            ) : (
                                <ViewHeader />
                            )}
                        </View>

                        <Checkbox label={task.name} checked={task.completed} />

                        {!editView && (
                            <View style={styles.dueDateContainer}>
                                <TaskDueDate
                                    dueDate={task.due_date}
                                    size="lg"
                                    defaultColorText
                                />
                            </View>
                        )}
                    </Animated.View>
                </Pressable>
            </Backdrop>
        </Modal>
    );
};

const ViewHeader = () => {
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 4,
                }}
            >
                <InboxIcon fill={colors.inbox} width="16" height="16" />
                <MyText
                    style={{ color: colors.icon, marginLeft: 4 + spacing(2) }}
                >
                    Inbox
                </MyText>
            </View>

            <MoreVerticalIcon width="20" height="20" />
        </>
    );
};

const EditHeader: React.FC<{ onBack: () => void }> = (props) => {
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Pressable onPress={props.onBack}>
                    <ArrowBackIcon />
                </Pressable>
                <MyText style={{ marginLeft: spacing(2) }}>Edit task</MyText>
            </View>
            <MyText>Save</MyText>
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
    containerExpanded: {
        height: '100%',
    },
    dueDateContainer: {
        marginTop: spacing(4),
    },
});

export default ViewTaskModal;
