import { Lap } from './lap.model';

export class ClockService {

  public laps: Lap[];

  private startAt: number;
  private lapTime: number;

  constructor() {
    this.reset();
  }

  now() {
    return new Date().getTime();
  }

  reset() {
    this.startAt = 0;
    this.lapTime = 0;

    this.laps = new Array<Lap>();
    this.laps.push(new Lap(0));
  }

  start() {
    this.startAt = this.startAt
      ? this.startAt
      : this.now();
  }

  stop() {
    const timeMs = this.startAt
      ? this.lapTime + this.now() - this.startAt
      : this.lapTime;

    this.lapTime = timeMs;
    this.laps[this.laps.length - 1].stop(timeMs);

    this.startAt = 0;
  }

  time() {
    return this.lapTime
      + (this.startAt ? this.now() - this.startAt : 0);
  }

  lap() {
    const timeMs = this.startAt  ? this.lapTime + this.now() - this.startAt : this.lapTime;

    this.laps[this.laps.length - 1].stop(timeMs);
    this.laps.push(new Lap(timeMs));
  }

  currentTime () {
    return this.getReadableString(this.now() - this.startAt);
  }

  /**
   * format millis to readable string
   * @param millis
   * @returns {{}}
   */
  getReadableString (millis) {
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

