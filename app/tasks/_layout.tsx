import { Slot, usePathname } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Menu, MyText } from '../../src/components';
import { CreateTaskModal } from '../../src/components/CreateTaskModal';
import { MenuIcon } from '../../src/components/Icons';
import { NavigationMenu } from '../../src/components/NavigationMenu';
import { ViewTaskModal } from '../../src/components/ViewTaskModal';
import { ROUTES } from '../../src/routes';
import { useStore } from '../../src/store';
import { colors, spacing } from '../../src/theme';

const windowDimensions = Dimensions.get('window');
const footerMidSectionWidth = 54;
const footerSideSectionWidth =
    (windowDimensions.width - footerMidSectionWidth) / 2;
const footerHeight = footerMidSectionWidth;
const addBtnRadius = footerMidSectionWidth / 2 - 2;

export default function Tasks() {
    const pathname = usePathname();
    const setMenuOpen = useStore((state) => state.setMenuOpen);

    const createTaskModal = useStore((state) => state.createTaskModal);
    const openCreateTaskModal = useStore((state) => state.openCreateTaskModal);
    const closeCreateTaskModal = useStore(
        (state) => state.closeCreateTaskModal
    );

    const viewTaskModal = useStore((state) => state.viewTaskModal);
    const closeViewTaskModal = useStore((state) => state.closeViewTaskModal);

    const showCompletedTasks = useStore(
        (state) => state.displaySettings.showCompleted
    );
    const setShowCompleted = useStore((state) => state.setShowCompleted);

    const handlePresentModalPress = () => {
        setMenuOpen(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MyText style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {getHeaderTitle(pathname)}
                </MyText>

                <Menu>
                    <Menu.MenuItem
                        Icon={<CheckmarkIcon />}
                        onPress={() => {
                            setShowCompleted(!showCompletedTasks);
                        }}
                    >
                        {showCompletedTasks ? 'Hide' : 'Show'} Completed Tasks
                    </Menu.MenuItem>
                </Menu>
            </View>

            <Slot />

            <View style={styles.footer}>
                <View
                    style={[
                        styles.footerSideSection,
                        { borderTopRightRadius: 12 },
                    ]}
                >
                    <Pressable onPress={handlePresentModalPress}>
                        <MenuIcon fill={colors.background} />
                    </Pressable>
                </View>
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
                        onPress={openCreateTaskModal}
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

            <NavigationMenu />

            <CreateTaskModal
                key={createTaskModal.key}
                visible={createTaskModal.open}
                onClose={closeCreateTaskModal}
            />

            <ViewTaskModal
                key={viewTaskModal.key}
                visible={viewTaskModal.open}
                task={viewTaskModal.task}
                onClose={closeViewTaskModal}
            />
        </View>
    );
}

function getHeaderTitle(pathname: string) {
    switch (pathname) {
        case ROUTES.inboxPage:
            return 'Inbox';

        case ROUTES.todayPage:
            return 'Today';

        default:
            return pathname;
    }
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
    footer: {
        flexDirection: 'row',
        height: footerHeight,
    },
    footerSideSection: {
        width: footerSideSectionWidth,
        backgroundColor: colors.menus,
        justifyContent: 'center',
        paddingHorizontal: spacing(4),
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

const CheckmarkIcon = () => (
    <Svg
        width="19"
        height="19"
        viewBox="0 0 416 416"
        strokeWidth="38"
        stroke={colors.icon}
    >
        <Path d="M 400,208 C 400,102 314,16 208,16 102,16 16,102 16,208 c 0,106 86,192 192,192 106,0 192,-86 192,-192 z" />
        <Path d="M 304,128 169.6,288 112,224" />
    </Svg>
);
