import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from '../googlesheet/google-docs.service';
import {ClockService} from './clock.service';
import {Lap} from './lap.model';
import {Topic} from './topic.model';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  providers: []
})
export class ClockComponent implements OnInit {
  // globalStartedAt is the beginning of the stop watch
  public globalStartedAt: number;

  // started at is the beginning of the current lap
  public lapStartedAt: number;
  private stopedAt: number;
  private stopWatch;
  public laps: Lap[];

  // array with topics of the google sheet
  private topics: Topic[];
  // active topic
  private activeTopicID: number;

  constructor() { }

  ngOnInit() {

    // set both values to zero
    this.resetClock();

    // initialize array of laps
    this.laps = [];

    // initialize array of topics
    this.topics = [];
    this.topics.push(new Topic('First Topic', 12));
    this.topics.push(new Topic('Second Topic', 6));
    this.topics.push(new Topic('Third Topic', 8));

    // set first topic to active topic
    this.activeTopicID = 0;
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

      const newLap = new Lap(this.lapStartedAt, currentTimeStamp);
      this.laps.push(newLap);

      // lapStartedAt set to the currentTimeStamp
      this.lapStartedAt = currentTimeStamp;

      // set lap value as needed time of a topic
      this.topics[this.activeTopicID].neededTime = newLap.getDuration();

      // ToDo do not update needed time of last topic when clicking once more on next topic
      // raise activeTopicID if topics array is long enough
      if (this.topics[this.activeTopicID + 1]) {
        this.activeTopicID++;

      } else {
        console.log('end of topics');
      }

      console.log('index: ' + this.activeTopicID);
    }
  }
}
