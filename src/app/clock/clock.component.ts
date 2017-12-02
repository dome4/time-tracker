import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from './google-docs.service';
import {ClockService} from './clock.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  providers: [GoogleDocsService, ClockService]
})
export class ClockComponent implements OnInit {
  private currentTimeStamp: number;
  private startedAt: number;
  private stopedAt: number;

  constructor(private googleService: GoogleDocsService, private clock: ClockService) { }

  ngOnInit() {
    this.activateClock();
    this.startedAt = 0;
    this.stopedAt = 0;
  }

  startClock () {
    // get milliseconds gibt nur die millis zurück, keine secs usw...
    this.startedAt = this.currentTimeStamp;

    console.log('date: ' + this.currentTimeStamp);

    // gleicher Wert, ansonsten wird die Dauer negativ
    this.stopedAt = this.currentTimeStamp;
  }

  stopClock () {
    this.stopedAt = this.currentTimeStamp;
  }

  getDuration () {
    return this.stopedAt - this.startedAt;
  }

  /**
   *  get the system time once per second
   */
  activateClock(): void {
    setInterval(() => {
      this.currentTimeStamp = new Date().getTime();
    }, 1000);
  }

  /**
   * format millis to readable string
   * @param millis
   * @returns {{}}
   */
  getReadableString (millis: number) {
    const dur = {};
    const units = [
      {label: 'Millis',    mod: 1000},
      {label: 'Sekunden',   mod: 60},
      {label: 'Minuten',   mod: 60},
      {label: 'Stunden',     mod: 24},
      {label: 'Tage',      mod: 31}
    ];
    // calculate the individual unit values...
    units.forEach(function(u){
      millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
    });
    // convert object to a string representation...
    const nonZero = function(u){ return dur[u.label]; };
    dur.toString = function(){
      return units
        .reverse()
        .filter(nonZero)
        .map(function(u){
          return dur[u.label] + ' ' + (dur[u.label] === 1 ? u.label.slice(0, -1) : u.label);
        })
        .join(', ');
    };
    return dur;
  }


}
