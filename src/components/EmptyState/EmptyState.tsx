import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { Draw } from '../Draw';
import { MyText } from '../MyText';

export const EmptyState = () => {
    return (
        <View style={styles.root}>
            <Draw name="empty-state" width="140" height="140" />

            <MyText style={{ marginTop: spacing(6) }} fontWeight="bold">
                Your peace of mind is priceless
            </MyText>
            <MyText style={{ marginTop: spacing(2), textAlign: 'center' }}>
                Well done! All your tasks are organized in the right place.
            </MyText>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 70,
    },
});
