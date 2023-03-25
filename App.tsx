import { StatusBar } from 'expo-status-bar';
import SafeAreaView from './src/components/SafeAreaView';
import HomePage from './src/routes/HomePage';

export default function App() {
    return (
        <SafeAreaView>
            <HomePage />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
