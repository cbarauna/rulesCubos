const moment = require("moment");
class Day {
  constructor(day) {
    this.day = moment(day, "dd-mm-yyyy");
    this.intervals = new Array();
  }
}
module.exports = Day;
