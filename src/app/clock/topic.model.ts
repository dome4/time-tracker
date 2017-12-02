export class Topic {

  /**
   *  constructor
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
}
