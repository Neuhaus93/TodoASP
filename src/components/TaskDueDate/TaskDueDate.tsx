import { StyleSheet, View } from 'react-native';
import { Task } from '../../api/types';
import { spacing } from '../../theme';
import { getTimestampInfo } from '../../utils/dateTime';
import { CalendarIcon } from '../Icons';
import { MyText } from '../MyText';

export type TaskDueDateProps = {
    /**
     * Task's due date, in unix timestamp
     */
    dueDate: Task['due_date'];
    /**
     * Size of the component
     */
    size?: 'md' | 'lg';
    /**
     * If `true`, the text color will be default
     */
    defaultColorText?: boolean;
    /**
     * Don't render the component if no due date is provided
     */
    hideIfNoDueDate?: boolean;
};

const TaskDueDate: React.FC<TaskDueDateProps> = (props) => {
    const {
        dueDate,
        size = 'md',
        defaultColorText = false,
        hideIfNoDueDate = false,
    } = props;
    const timestampInfo = getTimestampInfo(dueDate);

    const iconSize = size === 'md' ? 17 : 24;
    const fontSize = size === 'md' ? 12 : undefined;
    const fontColor = defaultColorText ? undefined : timestampInfo?.color;
    const textMarginLeft = size === 'md' ? spacing(1) : spacing(2);

    if (!dueDate && hideIfNoDueDate) {
        return null;
    }

    return (
        <View style={styles.root}>
            <CalendarIcon
                fill={timestampInfo.color}
                width={iconSize}
                height={iconSize}
            />
            <MyText
                style={{
                    fontSize,
                    color: fontColor,
                    marginLeft: textMarginLeft,
                }}
            >
                {timestampInfo.label}
            </MyText>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateLabel: {
        marginLeft: spacing(1),
    },
});

export default TaskDueDate;
