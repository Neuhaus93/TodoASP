import { Task } from '../api/types';
import { colors } from '../theme';

/**
 * Get complementing information on priority based on the value
 */
export function getPriorityInfo(priority: Task['priority']): {
    value: Task['priority'];
    labelShort: string;
    labelLong: string;
    color: string;
    colorSecondary: string;
    flagOutline?: boolean;
} {
    switch (priority) {
        case 1:
            return {
                value: 1,
                labelShort: 'P1',
                labelLong: 'Priority 1',
                color: colors.priority.high.main,
                colorSecondary: colors.priority.high.fill,
            };
        case 2:
            return {
                value: 2,
                labelShort: 'P2',
                labelLong: 'Priority 2',
                color: colors.priority.medium.main,
                colorSecondary: colors.priority.medium.fill,
            };
        case 3:
            return {
                value: 3,
                labelShort: 'P3',
                labelLong: 'Priority 3',
                color: colors.priority.low.main,
                colorSecondary: colors.priority.low.fill,
            };
        case 4:
            return {
                value: 4,
                labelShort: 'P4',
                labelLong: 'Priority',
                color: colors.priority.none.main,
                colorSecondary: colors.priority.none.fill,
                flagOutline: true,
            };
    }
}
