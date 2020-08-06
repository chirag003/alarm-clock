import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { map, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _clock: Observable<Date>;
    get clock(): Observable<Date> {
        return this._clock;
    }

    constructor() {
    }

    public runClock(): void {
        this._clock = interval(1000).pipe(
            map(( x: number ) => {
                return new Date();
            }),
            share()
        );
    }
}
