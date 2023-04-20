import { Rect, Svg } from 'react-native-svg';
import type { IconProps } from './IconProps';
import { colors } from '../../theme';

const MenuIcon: React.FC<IconProps> = (props) => {
    return (
        <Svg
            fill={colors.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <Rect x="3" y="11" width="18" height="2" rx=".95" ry=".95" />
            <Rect x="3" y="16" width="18" height="2" rx=".95" ry=".95" />
            <Rect x="3" y="6" width="18" height="2" rx=".95" ry=".95" />
        </Svg>
    );
};

export default MenuIcon;
