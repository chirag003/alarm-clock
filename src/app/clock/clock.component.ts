import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit {

    @Input() now: Date;

    constructor() {
    }

    ngOnInit() {
    }

}
