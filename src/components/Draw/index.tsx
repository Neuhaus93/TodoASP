import { NumberProp } from 'react-native-svg';
import EmptyStateDraw from './EmptyStateDraw';

export type DrawProps = {
    name: 'empty-state';
    width?: NumberProp;
    height?: NumberProp;
};

export const Draw = (props: DrawProps) => {
    const { name, ...rest } = props;

    switch (name) {
        case 'empty-state':
            return <EmptyStateDraw {...rest} />;

        default:
            throw new Error('Please insert a valid draw name');
    }
};
