import {
    FlatList,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    View,
} from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
import { getPriorityInfo } from '../../utils/priority';
import { BackdropModal } from '../Backdrop';
import FlagIcon from '../Icons/FlagIcon';
import { MyText } from '../MyText';

export type SelectPriorityModalProps = {
    /**
     * Current selected priority
     */
    priority: Task['priority'];
    /**
     * Callback fired when selecting a different priority
     */
    onPriorityChange: (priority: Task['priority']) => void;
    /**
     * Request the closing of the modal
     */
    onRequestClose: (event?: NativeSyntheticEvent<any>) => void;
} & Pick<ModalProps, 'visible'>;

export const SelectPriorityModal: React.FC<SelectPriorityModalProps> = (
    props
) => {
    const { visible, onRequestClose, priority = 4, onPriorityChange } = props;

    return (
        <BackdropModal visible={visible} onRequestClose={onRequestClose}>
            <View style={{ marginVertical: spacing(3) }}>
                <MyText
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: spacing(3),
                    }}
                >
                    Priority
                </MyText>
                <FlatList
                    data={itemsData}
                    renderItem={(itemProps) => (
                        <Item
                            {...itemProps}
                            priority={priority}
                            onSelect={(newPriority) => {
                                if (newPriority !== priority) {
                                    onPriorityChange(newPriority);
                                }

                                onRequestClose();
                            }}
                        />
                    )}
                    numColumns={4}
                    keyExtractor={(item) => String(item.value)}
                />
            </View>
        </BackdropModal>
    );
};

const Item: React.FC<{
    item: (typeof itemsData)[number];
    priority: SelectPriorityModalProps['priority'];
    onSelect: SelectPriorityModalProps['onPriorityChange'];
}> = ({ item, priority, onSelect }) => (
    <Pressable
        onPress={() => onSelect(item.value)}
        style={{
            borderWidth: 1,
            borderColor: colors.disabled,
            borderRadius: 8,
            flex: 1,
            maxWidth: '25%', // 100% devided by the number of rows you want
            alignItems: 'center',
            justifyContent: 'center',
            height: 75,
            marginRight: item.labelShort !== 'P4' ? spacing(3) : 0,
            backgroundColor:
                priority === item.value ? item.colorSecondary : undefined,
        }}
    >
        <FlagIcon fill={item.color} outline={item.flagOutline} />
        <MyText style={{ marginTop: spacing(0.5) }}>{item.labelShort}</MyText>
    </Pressable>
);

const itemsData = ([1, 2, 3, 4] as Task['priority'][]).map((item) =>
    getPriorityInfo(item)
);
