import dayjs from 'dayjs';
import { useState } from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTasks } from '../api/useTasks';
import { TaskItem, Text } from '../components';
import { colors, spacing } from '../theme';
import CreateTaskModal from './CreateTaskModal';

const windowDimensions = Dimensions.get('window');
const footerMidSectionWidth = 54;
const footerSideSectionWidth =
    (windowDimensions.width - footerMidSectionWidth) / 2;
const footerHeight = footerMidSectionWidth;
const addBtnRadius = footerMidSectionWidth / 2 - 2;

export default function HomePage() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createTaskModalKey, setCreateTaskModalKey] =
        useState('createTaskModal-0');

    const { data: tasks } = useTasks();

    const handlePlusButtonPress = () => {
        setCreateModalOpen(true);
    };

    const handleCloseCreateTaskModal = () => {
        const keyIndex = Number(createTaskModalKey.split('-')[1]);

        setCreateTaskModalKey(`createTaskModal-${keyIndex + 1}`);
        setCreateModalOpen(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Inbox</Text>
                <Svg fill={colors.icon} width="24" height="24">
                    <Circle cx="12" cy="12" r="2" />
                    <Circle cx="12" cy="5" r="2" />
                    <Circle cx="12" cy="19" r="2" />
                </Svg>
            </View>
            <ScrollView style={styles.main}>
                {Array.isArray(tasks) && (
                    <>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                label={task.name}
                                timestamp={task.due_date}
                            />
                        ))}
                    </>
                )}
            </ScrollView>
            <View style={styles.footer}>
                <View
                    style={[
                        styles.footerSideSection,
                        { borderTopRightRadius: 12 },
                    ]}
                />
                <View
                    style={{
                        width: footerMidSectionWidth,
                        position: 'relative',
                    }}
                >
                    <Svg
                        width={footerMidSectionWidth}
                        height={footerMidSectionWidth}
                        viewBox="0 0 3 3"
                        fill={colors.menus}
                    >
                        <Path d="M -0.1 0.05 L 0 3 L 3 3 L 3.1 0.05 C 3 2 0 2 -0.1 0.05" />
                    </Svg>
                    <Pressable
                        onPress={handlePlusButtonPress}
                        style={{
                            position: 'absolute',
                            left: footerMidSectionWidth / 2 - addBtnRadius,
                            top: -addBtnRadius - 2,
                        }}
                    >
                        <View style={styles.addBtnContainer}>
                            <Svg
                                fill={colors.background}
                                width={18}
                                height={18}
                                viewBox="0 0 24 24"
                            >
                                <Path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
                            </Svg>
                        </View>
                    </Pressable>
                </View>
                <View
                    style={[
                        styles.footerSideSection,
                        { borderTopLeftRadius: 12 },
                    ]}
                />
            </View>

            <CreateTaskModal
                key={createTaskModalKey}
                visible={createModalOpen}
                onClose={handleCloseCreateTaskModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
    },
    header: {
        paddingHorizontal: spacing(5),
        paddingVertical: spacing(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    main: {
        flex: 1,
        paddingLeft: spacing(5),
    },
    footer: {
        flexDirection: 'row',
        height: footerHeight,
    },
    footerSideSection: {
        width: footerSideSectionWidth,
        backgroundColor: colors.menus,
    },
    addBtnContainer: {
        width: addBtnRadius * 2,
        height: addBtnRadius * 2,
        backgroundColor: colors.menus,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,

        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

const testDates = {
    pastWeek: dayjs().subtract(1, 'week').unix(),
    yesterday: dayjs().subtract(1, 'day').unix(),
    today: dayjs().unix(),
    tomorrow: dayjs().add(1, 'day').unix(),
    futureClose: dayjs().add(2, 'day').unix(),
    nextYear: dayjs().add(1, 'week').add(1, 'year').unix(),
};
