export class Lap {

  /**
   *  constructor
   * @param {number} startTime
   * @param {number} stopTime
   */
  constructor (public startTime: number, public stopTime: number) {}

  /**
   *  get duration of the lap
   * @returns {number}
   */
  getDuration () {
    return this.stopTime - this.startTime;
  }
}
