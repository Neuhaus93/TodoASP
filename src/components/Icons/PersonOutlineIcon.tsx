import { Path, Svg } from 'react-native-svg';
import { colors } from '../../theme';
import type { IconProps } from './IconProps';

const PersonOutlineIcon: React.FC<IconProps> = (props) => {
    return (
        <Svg
            fill={colors.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <Path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
            <Path d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z" />
        </Svg>
    );
};

export default PersonOutlineIcon;
