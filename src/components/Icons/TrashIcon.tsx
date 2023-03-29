import { Path, Svg } from 'react-native-svg';
import type { IconProps } from './IconProps';

const TrashIcon: React.FC<IconProps> = (props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
            <Path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12z" />
        </Svg>
    );
};

export default TrashIcon;
