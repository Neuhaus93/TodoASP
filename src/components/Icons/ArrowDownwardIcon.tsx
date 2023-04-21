import { Path, Svg } from 'react-native-svg';
import { colors } from '../../theme';
import type { IconProps } from './IconProps';

const ArrowDownwardIcon: React.FC<IconProps> = (props) => {
    return (
        <Svg
            fill={colors.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z" />
        </Svg>
    );
};

export default ArrowDownwardIcon;
