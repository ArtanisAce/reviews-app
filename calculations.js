exports.calculateGeneral = (data) => data.reduce((acc, act) => acc + act.ratings.general.general, 0) / data.length;


