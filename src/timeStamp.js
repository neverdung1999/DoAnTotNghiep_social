import moment from "moment";

const timeStamp = (time) => {
  const dateNow = moment(Date.now());
  const dateParams = moment(time);
  const resultsSec = dateNow.diff(dateParams, "seconds");
  const resultsMin = dateNow.diff(dateParams, "minutes");
  const resultsOur = dateNow.diff(dateParams, "hours");
  const resultsDay = dateNow.diff(dateParams, "days");
  const resultsWeeks = dateNow.diff(dateParams, "weeks");

  let results = null;
  if (resultsSec <= 60) {
    results = resultsSec + " giây trước";
  } else if (resultsMin <= 60) {
    results = resultsMin + " phút trước";
  } else if (resultsOur <= 24) {
    results = resultsOur + " tiếng trước";
  } else if (resultsDay <= 7) {
    results = resultsDay + " ngày trước";
  } else {
    results = resultsWeeks + " tuần trước";
  }
  return results;
};

export default timeStamp;
