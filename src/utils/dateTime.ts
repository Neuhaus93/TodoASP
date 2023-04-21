import dayjs from 'dayjs';
import { colors } from '../theme';

/**
 * Gets the label and the color of a given timestamp in relation to current timestamp
 *
 * @param unixTimestamp
 * @returns
 */
export const getTimestampInfo = (
    unixTimestamp: number | null
): { label: string; color: string } => {
    const dayDiff = getTimestampDayDiffFromToday(unixTimestamp);

    if (!unixTimestamp || dayDiff === null) {
        return { label: 'Due Date', color: colors.date.future };
    }

    const dayjsObj = dayjs.unix(unixTimestamp);

    let dayFormat = 'D MMM';
    // If not the same as current year, include the year information
    if (!dayjsObj.isSame(dayjs(), 'year')) {
        dayFormat += ' YYYY';
    }

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
            const label = dayjsObj.format(dayFormat);

            if (dayDiff < -1) {
                return { label, color: colors.date.past };
            }

            return { label, color: colors.date.future };
        }
    }
};

/**
 * Get the diff in days from a provided unix timestamp from today
 * @param unixTimestamp
 * @returns
 */
export const getTimestampDayDiffFromToday = (unixTimestamp: number | null) => {
    if (!unixTimestamp) {
        return null;
    }

    return dayjs
        .unix(unixTimestamp)
        .startOf('day')
        .diff(dayjs().startOf('day'), 'day');
};

/**
 * Gets the unix timestamp value of a given date
 * @param date
 * @returns
 */
export const getDateTimestamp = (date: Date | null): number | null => {
    if (!date) {
        return null;
    }

    return Math.floor(date.valueOf() / 1000);
};

/**
 * Gets the current unix timestamp
 *
 * @returns
 */
export const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000);
};
