import dayjs from 'dayjs';
import calendarPlugin from 'dayjs/plugin/calendar';
import { colors } from '../theme';
dayjs.extend(calendarPlugin);

export const formatUnixTimestamp = (
    unixTimestamp: number | undefined
): { label: string; color: string } | null => {
    if (!unixTimestamp) {
        return null;
    }

    const dayjsObj = dayjs.unix(unixTimestamp);

    let dayFormat = 'D MMM';
    // If not the same as current year, include the year information
    if (!dayjsObj.isSame(dayjs(), 'year')) {
        dayFormat += ' YYYY';
    }

    const dayDiff = dayjsObj.startOf('day').diff(dayjs().startOf('day'), 'day');

    switch (dayDiff) {
        case -1:
            return { label: 'Yesterday', color: colors.date.past };

        case 0:
            return { label: 'Today', color: colors.date.today };

        case 1:
            return { label: 'Tomorrow', color: colors.date.tomorrow };

        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            return {
                label: dayjsObj.format('dddd'),
                color: colors.date.futureClose,
            };

        default: {
            return {
                label: dayjsObj.format(dayFormat),
                color: colors.date.future,
            };
        }
    }
};
