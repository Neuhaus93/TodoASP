import { View } from 'react-native';
import { colors } from '../../theme';

const Divider: React.FC = () => {
    return (
        <View
            style={{ borderBottomWidth: 1, borderBottomColor: colors.divider }}
        />
    );
};

export default Divider;
