import { Rect, Svg } from 'react-native-svg';
import { colors } from '../../theme';
import type { IconProps } from './IconProps';

const DescriptionIcon: React.FC<IconProps> = (props) => (
    <Svg
        fill={colors.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...props}
    >
        <Rect x="3" y="9.3804903" width="18" height="2" rx="0.95" ry="0.95" />
        <Rect x="3" y="14.38049" width="18" height="2" rx="0.95" ry="0.95" />
        <Rect x="3" y="4.3804903" width="18" height="2" rx="0.95" ry="0.95" />
        <Rect x="3" y="19.380491" width="9" height="2" rx="0.95" ry="0.95" />
    </Svg>
);

export default DescriptionIcon;
