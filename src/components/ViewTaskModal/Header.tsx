import React from 'react';
import { Pressable, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { ArrowBackIcon, InboxIcon, MoreVerticalIcon } from '../Icons';
import { MyText } from '../MyText';

type HeaderProps = {
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
                <ViewHeader />
            )}
        </View>
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
                    color="secondary"
                    style={{ marginLeft: 4 + spacing(2) }}
                >
                    Inbox
                </MyText>
            </View>

            <MoreVerticalIcon width="20" height="20" />
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
