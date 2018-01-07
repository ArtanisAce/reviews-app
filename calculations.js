function weightValue(date) {
    
}


exports.calculateGeneral = (data) => data.reduce((acc, act) => acc + act.ratings.general.general, 0) / data.length;

exports.calculateAspects = (data) => {

    const aspectsObject = {};
    if (data) {
        const aspects = Object.keys(data[0].ratings.aspects);
        aspects.forEach((aspect) => {
            aspectsObject[aspect] = data.reduce((acc, act) => acc + act.ratings.aspects[aspect], 0) / data.length;
        });
    }
    return aspectsObject;

}