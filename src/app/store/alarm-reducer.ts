/**
 * alarm-reducer
 */
import { Alarm } from './alarm-model';
import { AlarmActions, AlarmActionTypes } from './alarm-actions';

export interface State {
    alarms: Alarm[];
}

const initialState: State = {
    alarms: [],
};

export function uuid() {
    let result = '';

    for (let i = 0; i < 32; i++) {
        const random = Math.random() * 16 || 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }
        result += (i === 12 ? 4 : (i === 16 ? (random && 3 || 8) : random))
            .toString(16);
    }

    return result;
}

export function reducer( state = initialState, action: AlarmActions ): State {
    switch (action.type) {
        case AlarmActionTypes.AddAlarm:
            const dateTime = action.payload;
            const now = new Date();
            const status = dateTime.getTime() - now.getTime() >= 0;
            const newAlarm = {
                id: uuid(),
                date_time: dateTime,
                status: status,
                in: status
            };

            return {
                alarms: [...state.alarms, newAlarm]
            };

        case AlarmActionTypes.RemoveAlarm: {
            const alarms = state.alarms.filter(( alarm: Alarm ) => alarm.id !== action.payload);

            return {
                alarms
            };
        }

        case AlarmActionTypes.TurnOffAlarms: {
            const nowMoment = new Date();
            const alarms = state.alarms.map(( alarm: Alarm ) => {
                const off = nowMoment.getTime() - alarm.date_time.getTime() >= 0;
                if (off && alarm.status) {
                    alarm.status = false;
                    alarm.in = false;
                }

                return alarm;
            });

            return {
                alarms
            };
        }

        case AlarmActionTypes.ToggleAlarmStatus: {
            const alarms = state.alarms.map(( alarm: Alarm ) => {
                if (alarm.id === action.payload.id) {
                    alarm.status = action.payload.status;
                }
                return alarm;
            });

            return {
                alarms
            };
        }

        default:
            return state;
    }
}

export const getAlarms = ( state: State ) => state.alarms;
