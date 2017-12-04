export class Topic {

  /**
   *  constructor
   *  estimatedTime and neededTime are both in millis
   * @param {string} name
   * @param {number} estimatedTime
   * @param {number} neededTime
   */
  constructor(public name: string, public estimatedTime: number, public neededTime?: number) {}

  /**
   *  calculate the difference between the estimated and the needed time of the topic
   * @returns {number}
   */
  getTimeDifference() {
    return this.estimatedTime - this.neededTime;
  }

  /**
   *  check if neededTime is bigger than estimatedTime
   * @returns {boolean | boolean}
   */
  neededTimeVsEstimatedTime() {
    return this.neededTime > this.estimatedTime ? true : false;
  }
}
