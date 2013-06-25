var data = [
{ id: 1, info: 'drinks', amount: 55,   date: '10.07.2013' },
{ id: 4, info: 'food',   amount: 10.5, date: '11.05.2013' },
{ id: 2, info: 'girls',  amount: 1000, date: '23.05.2013' },
{ id: 5, info: 'dog',    amount: 23.2, date: '11.10.2012' },
{ id: 3, info: 'drinks', amount: 51,   date: '11.07.2013' },
{ id: 7, info: 'food',   amount: 40.5, date: '12.05.2013' },
{ id: 8, info: 'girls',  amount: 1002, date: '13.05.2013' },
{ id: 9, info: 'dog',    amount: 29.2, date: '13.10.2012' },
{ id: 10, info: 'dog',   amount: 21.2, date: '02.01.2012' },
{ id: 11, info: 'dog',   amount: 292.2,date: '14.01.2012' },
{ id: 12, info: 'dog',   amount: 2.2,  date: '16.01.2013' },
{ id: 13, info: 'dog',   amount: 92.2, date: '17.03.2013' },
{ id: 14, info: 'dog',   amount: 22.2, date: '19.02.2013' }
];

_.each(data, function (item) {
    item.date = moment(item.date, 'DD.MM.YYYY');
});

(function (ns, undefined) {
    var getTimeLine = function () {
        var groupedByYear = _.groupBy(data, function(item) {
            return item.date.year();
        });

        var groupedByYearAndMonth = {};

        for (var prop in groupedByYear) {
            if (groupedByYear.hasOwnProperty(prop)) {
                groupedByYearAndMonth[prop] =
                _.groupBy(groupedByYear[prop], function(item) {
                    return item.date.month();
                });
            }
        }
        groupedByYear = null;

        var timeLine = new xpss.TimeLine();

        for (var year in groupedByYearAndMonth) {
            if (groupedByYearAndMonth.hasOwnProperty(year)) {
                var oneYearSpan = groupedByYearAndMonth[year];

                for (var month in oneYearSpan) {
                    if (oneYearSpan.hasOwnProperty(month)) {
                        var item = new xpss.Month({
                            year: parseInt(year, 10),
                            month: parseInt(month, 10),
                            expenses: new xpss.ExpensesList(oneYearSpan[month])
                        });
                        timeLine.add(item);
                    }
                }
            }
        }
        groupedByYearAndMonth = null;

        return timeLine;
    }
    xpss.getTimeLine = getTimeLine;
}(window.xpss = window.xpss || {}))