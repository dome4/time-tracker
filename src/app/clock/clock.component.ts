import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from './google-docs.service';
import {ClockService} from './clock.service';
import {Lap} from './lap.model';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  providers: [GoogleDocsService, ClockService]
})
export class ClockComponent implements OnInit {
  // globalStartedAt is the beginning of the stop watch
  private globalStartedAt: number;

  // started at is the beginning of the current lap
  private lapStartedAt: number;
  private stopedAt: number;
  private stopWatch;
  private laps: Lap[];

  constructor(private googleService: GoogleDocsService, private clock: ClockService) { }

  ngOnInit() {

    // set both values to zero
    this.resetClock();

    // initialize array of laps
    this.laps = [];
  }

  /**
   *  start stop watch
   */
  startClock (): void {
    this.lapStartedAt = new Date().getTime();

    // if global lapStartedAt is not initialized yet
    if (this.globalStartedAt === 0) {
      this.globalStartedAt = this.lapStartedAt;
    }

    this.stopedAt = new Date().getTime();
    this.stopWatch = setInterval(() => {
        // set the same value to prevent negative durations
        this.stopedAt = new Date().getTime();
      }, 1000);
  }

  /**
   *  stop stop watch
   */
  stopClock (): void {

    // only if stop watch is running
    if (this.stopWatch) {
      this.stopedAt = new Date().getTime();
      clearInterval(this.stopWatch);
      this.stopWatch = false;
    }
  }

  /**
   *  set both values to zero
   */
  resetClock (): void {
    this.lapStartedAt = 0;
    this.stopedAt = 0;
    this.globalStartedAt = 0;

    // stop stop watch interval
    if (this.stopWatch) {
      clearInterval(this.stopWatch);
    }
  }

  /**
   *  get the current duration of the stop watch
   * @returns {{}}
   */
  getGlobalDuration () {
    const dur = this.stopedAt - this.globalStartedAt;
    return dur;
  }

  /**
   *  save the duration of the current topic and start the next one
   */
  nextTopic () {
    const currentTimeStamp = new Date().getTime();

    // only if stop watch is active
    if (this.stopWatch) {

      this.laps.push(new Lap(this.lapStartedAt, currentTimeStamp));

      // lapStartedAt set to the currentTimeStamp
      this.lapStartedAt = currentTimeStamp;
    }
  }
}
