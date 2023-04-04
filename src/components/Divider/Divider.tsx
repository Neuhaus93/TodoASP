import { View } from 'react-native';
import { colors } from '../../theme';

export type DividerProps = {
    /** Vertical margin of the divider */
    marginVertical?: number;
};

const Divider: React.FC<DividerProps> = ({ marginVertical }) => {
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.divider,
                marginVertical,
            }}
        />
    );
};

export default Divider;
