import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-alarm-input',
    templateUrl: './alarm-input.component.html',
    styleUrls: ['./alarm-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmInputComponent implements OnInit {

    public value: Date;

    @Output() add = new EventEmitter<Date>();

    constructor(private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    public handleAddBtnClick(): void {
        if (this.value) {
            this.add.emit(this.value);
            this.value = null;
            this.cdRef.markForCheck();
        }
    }
}
