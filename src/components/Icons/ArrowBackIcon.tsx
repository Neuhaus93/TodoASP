import { Path, Svg } from 'react-native-svg';
import { colors } from '../../theme';
import type { IconProps } from './IconProps';

const ArrowBackIcon: React.FC<IconProps> = (props) => (
    <Svg
        fill={colors.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...props}
    >
        <Path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z" />
    </Svg>
);

export default ArrowBackIcon;
