import { Circle, Svg } from 'react-native-svg';
import { colors } from '../../theme';
import type { IconProps } from './IconProps';

const MoreVerticalIcon: React.FC<IconProps> = (props) => (
    <Svg
        fill={colors.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...props}
    >
        <Circle cx="12" cy="12" r="2" />
        <Circle cx="12" cy="5" r="2" />
        <Circle cx="12" cy="19" r="2" />
    </Svg>
);

export default MoreVerticalIcon;
