import {
    BottomSheetBackdropProps,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Link, usePathname } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { BackHandler, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { ROUTES } from '../../routes';
import { useStore } from '../../store';
import { colors, spacing } from '../../theme';
import { Divider } from '../Divider';
import {
    CalendarIcon,
    InboxIcon,
    PersonOutlineIcon,
    SettingsOutlineIcon,
} from '../Icons';
import { MyText } from '../MyText';

const NavigationMenu = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const menu = useStore((state) => state.menu);
    const setMenuOpen = useStore((state) => state.setMenuOpen);
    const pathname = usePathname();

    useEffect(() => {
        bottomSheetModalRef.current?.dismiss(); // Dismiss the bottom sheet modal
        setMenuOpen(false);
    }, [setMenuOpen, pathname]);

    useEffect(() => {
        const handleBackPress = () => {
            if (menu.open) {
                bottomSheetModalRef.current?.dismiss(); // Dismiss the bottom sheet modal
                setMenuOpen(false);
                return true; // Indicate that we have handled the back button
            }

            return false; // Let the default back button behavior take over if the menu is closed
        };

        // Add event listener for the hardware back button
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Remove event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackPress
            );
        };
    }, [menu.open, setMenuOpen]);

    // Present the menu when it opens
    useEffect(() => {
        if (menu.open) {
            bottomSheetModalRef.current?.present();
        }
    }, [menu.open]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={['95%']}
            backdropComponent={CustomBackdrop}
            onChange={(index) => {
                switch (index) {
                    case 0:
                        setMenuOpen(true);
                        break;

                    case -1:
                        setMenuOpen(false);
                        break;
                }
            }}
        >
            <View style={styles.contentContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: spacing(4),
                        marginVertical: spacing(4),
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 999,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.icon,
                            }}
                        >
                            <PersonOutlineIcon />
                        </View>

                        <View style={{ marginLeft: spacing(3) }}>
                            <MyText fontWeight="bold" style={{ fontSize: 20 }}>
                                John Smith
                            </MyText>
                            <MyText color="secondary">0/5</MyText>
                        </View>
                    </View>
                    <View>
                        <SettingsOutlineIcon />
                    </View>
                </View>

                <Divider />

                <View style={{ marginTop: spacing(4) }}>
                    {navigationItems.map((item, index) => (
                        <NavigationMenuItem
                            key={index}
                            selected={item.href === pathname}
                            {...item}
                        />
                    ))}
                </View>
            </View>
        </BottomSheetModal>
    );
};

const navigationItems: Array<{
    Icon: React.ReactNode;
    label: string;
    href: string;
}> = [
    {
        Icon: <InboxIcon width={20} fill={colors.inbox} />,
        label: 'Inbox',
        href: ROUTES.inboxPage,
    },
    {
        Icon: <CalendarIcon width={20} fill={colors.date.today} />,
        label: 'Today',
        href: ROUTES.todayPage,
    },
];

type NavigationMenuItemProps = (typeof navigationItems)[number] & {
    selected: boolean;
};

const NavigationMenuItem = ({
    Icon,
    label,
    selected,
    href,
}: NavigationMenuItemProps) => {
    return (
        <Link href={href} asChild>
            <Pressable>
                <View
                    style={{
                        paddingHorizontal: spacing(4),
                        paddingVertical: spacing(2.5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: selected
                            ? 'rgba(0,0,0,0.10)'
                            : 'transparent',
                    }}
                >
                    {Icon}
                    <MyText style={{ marginLeft: spacing(4) }}>{label}</MyText>
                </View>
            </Pressable>
        </Link>
    );
};

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: 'rgba(0,0,0,0.4)',
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle} />;
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
});

export default NavigationMenu;
