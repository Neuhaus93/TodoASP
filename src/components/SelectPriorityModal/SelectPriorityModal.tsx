import {
    FlatList,
    ModalProps,
    NativeSyntheticEvent,
    Pressable,
    View,
} from 'react-native';
import { Task } from '../../api/types';
import { colors, spacing } from '../../theme';
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
                    keyExtractor={(item) => item.label}
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
        onPress={() => onSelect(item.priority)}
        style={{
            borderWidth: 1,
            borderColor: colors.disabled,
            borderRadius: 8,
            flex: 1,
            maxWidth: '25%', // 100% devided by the number of rows you want
            alignItems: 'center',
            justifyContent: 'center',
            height: 75,
            marginRight: item.label !== 'P4' ? spacing(3) : 0,
            backgroundColor:
                priority === item.priority ? item.selectedBg : undefined,
        }}
    >
        <FlagIcon fill={item.fill} outline={item.outline} />
        <MyText style={{ marginTop: spacing(0.5) }}>{item.priority}</MyText>
    </Pressable>
);

const itemsData = [
    {
        priority: 1 as Task['priority'],
        label: 'P1',
        fill: colors.priority.high.main,
        selectedBg: colors.priority.high.fill,
        outline: false,
    },
    {
        priority: 2 as Task['priority'],
        label: 'P2',
        fill: colors.priority.medium.main,
        selectedBg: colors.priority.medium.fill,
        outline: false,
    },
    {
        priority: 3 as Task['priority'],
        label: 'P3',
        fill: colors.priority.low.main,
        selectedBg: colors.priority.low.fill,
        outline: false,
    },
    {
        priority: 4 as Task['priority'],
        label: 'P4',
        fill: colors.priority.none.main,
        selectedBg: colors.priority.none.fill,
        outline: true,
    },
];
