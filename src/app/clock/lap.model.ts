export class Lap {
  public startTime: number;
  public stopTime: number;

  constructor (startTime: number) {
    this.startTime = startTime;
    this.stopTime = 0;
  }

  stop(time: number) {
    this.stopTime = time;
  }
}
