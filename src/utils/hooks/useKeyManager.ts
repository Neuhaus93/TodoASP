import { useState } from 'react';

/**
 * Manage keys for components, providing unique names and a function to update them
 *
 * @param key
 */
const useKeyManager = <T extends string>(
    keyIds: T[]
): [Record<T, string>, (keyId: T) => void] => {
    const [keys, setKeys] = useState(() => setInitialKeys(keyIds));

    /**
     * Updates the value of one key
     *
     * @param keyId
     */
    const updateKey = (keyId: T) => {
        setKeys((current) => ({
            ...current,
            [keyId]: updateValue({
                id: keyId,
                value: current[keyId] as any,
            }),
        }));
    };

    return [keys, updateKey];
};

/**
 * Set the initial keys based on the given IDs array
 * @param keyIds
 * @returns
 */
function setInitialKeys<T extends string>(keyIds: T[]): Record<T, string> {
    const keys: Record<string, string> = {};

    keyIds.forEach((id) => {
        keys[id] = `${id}-0`;
    });

    return keys;
}

/**
 * Update the value of a given key
 *
 * @returns
 */
function updateValue<T extends string>({
    id,
    value,
}: {
    id: T;
    value: string;
}): string {
    const keyIndex = Number(value.split('-')[1]);

    return `${id}-${keyIndex + 1}`;
}

export { useKeyManager };
