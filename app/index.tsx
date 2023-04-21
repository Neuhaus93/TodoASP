import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTasks } from '../src/features/Tasks/queries';

export default function HomePage() {
    const { isSuccess, isError } = useTasks();
    const [ready, setReady] = useState(false);

    // When the tasks query settles, remove the splash screen
    useEffect(() => {
        if (!ready && (isSuccess || isError)) {
            setReady(true);
        }
    }, [ready, isSuccess, isError]);

    if (!ready) {
        return <SplashScreen />;
    }

    return <Redirect href="/tasks/inbox" />;
}
