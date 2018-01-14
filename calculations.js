// The weight value can be calculated as follows: when the review is older than
// 5 years its weight value defaults to 0.5. Otherwise it equals: 1 -
// (current_year - year_of_review)*0.1
function weightValue(date) {
  const actualDate = Date.now();
  const fullActualDate = new Date(actualDate);
  const reviewDate = new Date(date);
  const fiveYears = 157784500000;

  if (actualDate - fiveYears > date) {
    return 0.5;
  } else {
    return 1 - (fullActualDate.getFullYear() - reviewDate.getFullYear()) * 0.1;
  }
}

exports.calculateGeneral = data =>
  (
    data.reduce(
      (acc, act) =>
        acc + act.ratings.general.general * weightValue(act.entryDate),
      0
    ) / data.length
  ).toFixed(2);

exports.calculateAspects = data => {
  const aspectsObject = {};
  if (data) {
    const aspects = Object.keys(data[0].ratings.aspects);
    aspects.forEach(aspect => {
      aspectsObject[aspect] = (
        data.reduce(
          (acc, act) =>
            acc + act.ratings.aspects[aspect] * weightValue(act.entryDate),
          0
        ) / data.length
      ).toFixed(2);
    });
  }
  return aspectsObject;
};
