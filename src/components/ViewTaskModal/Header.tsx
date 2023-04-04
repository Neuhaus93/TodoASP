import dayjs from 'dayjs';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { BackdropModal } from '../Backdrop';
import { Divider } from '../Divider';
import {
    ArrowBackIcon,
    InboxIcon,
    MoreVerticalIcon,
    TrashIcon,
} from '../Icons';
import { MyText } from '../MyText';

type HeaderProps = {
    task: Task;
    onDeleteTask: () => void;
    editView: boolean;
    editHeaderProps: {
        onBack: () => void;
        disableSave: boolean;
        onSave: () => void;
    };
};

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing(4),
            }}
        >
            {props.editView ? (
                <EditHeader {...props.editHeaderProps} />
            ) : (
                <ViewHeader
                    task={props.task}
                    onDeleteTask={props.onDeleteTask}
                />
            )}
        </View>
    );
};

const ViewHeader = ({
    task,
    onDeleteTask,
}: Pick<HeaderProps, 'task' | 'onDeleteTask'>) => {
    const [visible, setVisible] = useState(false);
    const note = (() => {
        const format = (timestamp: number) => {
            return dayjs.unix(timestamp).format('MMM D h:mmA');
        };

        if (task.completed && task.completed_at) {
            return `Completed on ${format(task.completed_at)}`;
        }

        return `Added on ${format(task.created_at)}`;
    })();

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
                    color="secondary"
                    style={{ marginLeft: 4 + spacing(2) }}
                >
                    Inbox
                </MyText>
            </View>

            <Pressable onPress={() => setVisible(true)}>
                <MoreVerticalIcon width="20" height="20" />
            </Pressable>

            <BackdropModal
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={{ marginVertical: spacing(2) }}>
                    <MyText color="secondary">{note}</MyText>
                    <Divider marginVertical={spacing(4)} />
                    <Pressable
                        onPress={() => {
                            setVisible(false);
                            onDeleteTask();
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TrashIcon fill={colors.text.error} />
                        <MyText
                            color="error"
                            style={{ marginLeft: spacing(3), fontSize: 16 }}
                        >
                            Delete Task
                        </MyText>
                    </Pressable>
                </View>
            </BackdropModal>
        </>
    );
};

const EditHeader: React.FC<HeaderProps['editHeaderProps']> = (props) => {
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
            <Pressable onPress={props.onSave} disabled={props.disableSave}>
                <MyText color={props.disableSave ? 'disabled' : 'primary'}>
                    Save
                </MyText>
            </Pressable>
        </>
    );
};

export default Header;
