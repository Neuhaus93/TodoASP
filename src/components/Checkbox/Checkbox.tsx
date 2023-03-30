import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, spacing } from '../../theme';
import { Text } from '../Text';

export type CheckboxProps = {
    label?: string;
    checked?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { label } = props;

    return (
        <View style={styles.root}>
            <Svg
                stroke={colors.icon}
                fill="transparent"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <Circle strokeWidth="1" cx="12" cy="12" r="11" />
            </Svg>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: spacing(2),
    },
});

export default Checkbox;
