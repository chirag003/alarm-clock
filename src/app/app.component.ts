import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { Alarm } from './store/alarm-model';
import * as fromRoot from './store';
import * as fromAlarmActions from './store/alarm-actions';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    @ViewChild('alarmAudio') alarmAudioElmRef: ElementRef;

    public alarms$: Observable<Alarm[]>;

    public isPlaying: boolean = false;

    private snackBarRef: MatSnackBarRef<any>;

    get clock$(): Observable<Date> {
        return this.appService.clock;
    }

    constructor( private appService: AppService,
                 private store: Store<fromRoot.State>,
                 private snackBar: MatSnackBar ) {
    }

    public ngOnInit(): void {
        this.appService.runClock();
        this.alarms$ = this.store.pipe(select(fromRoot.getAlarms));

        combineLatest(this.alarms$, this.clock$).pipe(
            map(( [alarms, clockTime] ) => {
                return this.checkAlarm(alarms, clockTime);
            })
        ).subscribe(( alarm ) => {
            if (alarm) {
                this.playAlarmRing();
            }
        });
    }

    public handleAlarmAdd( alarmValue: Date ) {
        this.store.dispatch(new fromAlarmActions.AddAlarm(alarmValue));
    }

    public handleAlarmCancel( alarm: Alarm ) {
        this.store.dispatch(new fromAlarmActions.RemoveAlarm(alarm.id));
    }

    public handleAlarmToggle( alarm: Alarm ) {
        if (alarm.in) {
            this.store.dispatch(
                new fromAlarmActions.ToggleAlarmStatus({id: alarm.id, status: !alarm.status})
            );
        }
    }

    private checkAlarm( alarms: Alarm[], clockTime: Date ): Alarm | null {
        for (const alarm of alarms) {
            if (alarm.date_time <= clockTime && alarm.status) {
                return alarm;
            }
        }

        return null;
    }

    private playAlarmRing(): void {
        if (!this.isPlaying) {
            console.log('playing');
            this.alarmAudioElmRef.nativeElement.play();
            this.openSnackBar();
            this.isPlaying = true;
        }

        return;
    }

    private pauseAlarmRing(): void {
        if (this.isPlaying) {
            console.log('paused');
            this.alarmAudioElmRef.nativeElement.pause();
            this.isPlaying = false;
        }

        return;
    }

    private openSnackBar() {
        if (this.snackBarRef) {
            this.snackBarRef = null;
        }
        this.snackBarRef = this.snackBar.open('Alarm Ringing!!!', 'Dismiss');

        this.snackBarRef.onAction().subscribe(() => {
            this.turnOffAlarms();
        });
    }

    private turnOffAlarms(): void {
        this.store.dispatch(new fromAlarmActions.TurnOffAlarms());
        this.pauseAlarmRing();
        this.snackBarRef.dismiss();
        this.snackBarRef = null;
    }
}
