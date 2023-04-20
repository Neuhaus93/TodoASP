import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import 'expo-router/entry';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '../src/api/queryClient';
import SafeAreaView from '../src/components/SafeAreaView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <BottomSheetModalProvider>
                    <SafeAreaView>
                        <Slot />
                        <StatusBar style="auto" />
                    </SafeAreaView>
                </BottomSheetModalProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
