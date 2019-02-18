const _ = require("lodash");
const Day = require("../models/Day");
const Intervals = require("../models/Intervals");
const moment = require("moment");
const dayName = new Array(
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
);
module.exports = {
  validDay(body) {
    if (
      !!body &&
      _.filter(dayName, val => {
        return val === body.day;
      }).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  },

  montarJson(value) {
    let dayModel = new Day();
    dayModel.day = value.day;

    if (!!value && _.isArray(value.intervals)) {
      value.intervals.filter((interval = new Intervals()) => {
        dayModel.intervals.push({
          start: interval.start,
          end: interval.end
        });
      });
    }
    if (
      moment(dayModel.day, "dd-mm-yyyy").isValid() &
      (dayModel.intervals.length > 0)
    )
      return dayModel;

    return false;
  },
  removeDuplicateDay(day, dataDb) {
    let date;
    let aqui = _.filter(dataDb, { day: day });
    if (!!day && !!dataDb) {
      date = dataDb.filter(data => {
        return moment(data.day, "DD-MM-YYYY").isSame(moment(day, "DD-MM-YYYY"));
      });
    }
    console.log(date);
  }
};
