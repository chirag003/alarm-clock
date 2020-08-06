import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alarm } from '../store/alarm-model';

@Component({
    selector: 'app-alarm-list',
    templateUrl: './alarm-list.component.html',
    styleUrls: ['./alarm-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmListComponent implements OnInit {

    @Input() dataSource: Alarm[];

    @Output() cancelAlarm = new EventEmitter<Alarm>();

    @Output() toggleAlarm = new EventEmitter<Alarm>();

    public displayedColumns: string[] = ['position', 'moment', 'status', 'action'];

    constructor() {
    }

    ngOnInit() {
    }

    public handleCancelBtnClick( event: any, alarm: Alarm ) {
        this.cancelAlarm.emit(alarm);
        event.preventDefault();
    }

    public handleToggleBtnClick( event: any, alarm: Alarm ) {
        this.toggleAlarm.emit(alarm);
        event.preventDefault();
    }
}
