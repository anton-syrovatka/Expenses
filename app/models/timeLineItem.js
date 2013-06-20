(function (ns, undefined) {
    var TimeLineItem = Backbone.Model.extend({
        
        defaults: {
          expenses: []  
        },

        title: function () {
            var month = moment()
                .month(this.get('month'))
                .format('MMM');
            var year = this.get('year')
                .toString()
                .substring(2);
            return month + " '" + year;
        },

        expensesCount: function () {
            return this.get('expenses').length;
        },

        totalAmount: function () {
            var temp = 0;
            var expenses = this.get('expenses');
            return expenses.reduce(function (memo, item) {
                return memo + item.get('amount');
            }, temp);
        },
        
        isCurrent: function() {
            return this.get('year') === moment().year()
                && this.get('month') === moment().month();
        }
    });

    var TimeLine = Backbone.Collection.extend({

        model: TimeLineItem,

        comparator: function (item) {
            return [item.get('year'), item.get('month')];
        }
    }, {
        getPrevMonth: function (month, timeLine) {
            var criterion = {
                month: month.get('month') - 1,
                year: month.get('year')
            };
            if (criterion.month === -1) {
                criterion.month = 11;
                criterion.year -= 1;
            }
            var prevMonth = timeLine.findWhere(criterion);
            if (!prevMonth) {
                prevMonth = new TimeLineItem(criterion);
            }
            return prevMonth;
        },
        
        getNextMonth: function(month, timeLine) {
            var criterion = {
                month: month.get('month') + 1,
                year: month.get('year')
            };
            if (criterion.month === 12) {
                criterion.month = 0;
                criterion.year += 1;
            }
            var nextMonth = timeLine.findWhere(criterion);
            if (!nextMonth) {
                nextMonth = new TimeLineItem(criterion);
            }
            return nextMonth;
        },
        
        getMonthsFromNow: function (number, timeLine) {
            var arr = [];
            var currentMonth = this.getCurrenMonth(timeLine);
            arr[number - 1] = currentMonth;
            for (var i = number -2 ; i >= 0; i--) {
                var month = this.getPrevMonth(currentMonth, timeLine);
                arr[i] = month;
                currentMonth = month;
            }
            return arr;
        },
        
        getCurrenMonth: function (timeLine) {
            var criterion = {
                month: moment().month(),
                year: moment().year()
            };
            var current = timeLine.findWhere(criterion);
            return current && new TimeLineItem(current.toJSON())
                || new TimeLineItem(criterion);
        }
    });

    ns.TimeLineItem = TimeLineItem;
    ns.TimeLine = TimeLine;

}(window.xpss = window.xpss || {}))