import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import 'expo-router/entry';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '../src/api/queryClient';
import SafeAreaView from '../src/components/SafeAreaView';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView>
                <Slot />
                <StatusBar style="auto" />
            </SafeAreaView>
        </QueryClientProvider>
    );
}
