/**
 * alarm-actions
 */

import { Action } from '@ngrx/store';

export enum AlarmActionTypes {
    AddAlarm = 'Add Alarm',
    RemoveAlarm = 'Remove Alarm',
    TurnOffAlarms = 'Turn Off Alarms',
    ToggleAlarmStatus = 'Toggle Alarm Status',
}

export class AddAlarm implements Action {
    readonly type = AlarmActionTypes.AddAlarm;

    constructor( public payload: Date ) {
    }
}

export class RemoveAlarm implements Action {
    readonly type = AlarmActionTypes.RemoveAlarm;

    constructor( public payload: string ) {
    }
}

export class TurnOffAlarms implements Action {
    readonly type = AlarmActionTypes.TurnOffAlarms;

    constructor() {
    }
}

export class ToggleAlarmStatus implements Action {
    readonly type = AlarmActionTypes.ToggleAlarmStatus;

    constructor( public payload: { id: string, status: boolean } ) {
    }
}

export type AlarmActions =
    AddAlarm |
    RemoveAlarm |
    TurnOffAlarms |
    ToggleAlarmStatus;
