import { Circle, Path, Svg } from 'react-native-svg';
import { Task } from '../../api/types';
import { colors } from '../../theme';
import type { IconProps } from './IconProps';

const CheckmarkIcon: React.FC<
    IconProps & {
        checked: boolean;
        priority: Task['priority'];
    }
> = (props) => {
    const { checked, priority, ...rest } = props;
    const priorityColors = getPriorityColors(priority);

    if (checked) {
        return (
            <Svg
                fill={priorityColors.main}
                width="24"
                height="24"
                viewBox="0 0 416 416"
                {...rest}
            >
                <Path d="M 208,0 C 93.31,0 0,93.31 0,208 0,322.69 93.31,416 208,416 322.69,416 416,322.69 416,208 416,93.31 322.69,0 208,0 Z m 108.25,138.29 -134.4,160 a 16,16 0 0 1 -12,5.71 h -0.27 a 16,16 0 0 1 -11.89,-5.3 l -57.6,-64 a 16,16 0 1 1 23.78,-21.4 l 45.29,50.32 122.59,-145.91 a 16,16 0 0 1 24.5,20.58 z" />
            </Svg>
        );
    }

    return (
        <Svg
            stroke={priorityColors.main}
            fill={priorityColors.fill}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...rest}
        >
            <Circle
                strokeWidth={props.priority === 4 ? '1' : '2'}
                cx="12"
                cy="12"
                r="11"
            />
        </Svg>
    );
};

function getPriorityColors(priority: Task['priority']) {
    switch (priority) {
        case 1:
            return colors.priority.high;
        case 2:
            return colors.priority.medium;
        case 3:
            return colors.priority.low;
        case 4:
            return {
                main: colors.priority.none.main,
                fill: 'transparent',
            };
    }
}

export default CheckmarkIcon;
