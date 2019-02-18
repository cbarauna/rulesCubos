class Intervals {
  constructor(start, end) {
    this.start = moment(start, "HH:mm");
    this.end = moment(end, "HH:mm");
  }
}
module.exports = Intervals;
