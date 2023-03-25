import {
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView as BaseSafeAreaView,
} from 'react-native';
import React, { PropsWithChildren } from 'react';
import { colors } from '../colors';

const SafeAreaView: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <BaseSafeAreaView style={styles.safeAreaView}>
            {children}
        </BaseSafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});

export default SafeAreaView;
