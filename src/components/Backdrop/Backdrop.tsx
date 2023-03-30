import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export type BackdropProps = PropsWithChildren<{
    /**
     * Callback fired when the backdrop is closed
     */
    onClose: () => void;
}>;

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => (
    <Pressable onPressOut={onClose} style={styles.root}>
        {children}
    </Pressable>
);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
});

export default Backdrop;
