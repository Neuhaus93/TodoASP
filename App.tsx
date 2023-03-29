import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from './src/api/queryClient';
import SafeAreaView from './src/components/SafeAreaView';
import HomePage from './src/routes/HomePage';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView>
                <HomePage />
                <StatusBar style="auto" />
            </SafeAreaView>
        </QueryClientProvider>
    );
}
