(function (ns, undefined) {
    var AppView = Backbone.View.extend({
        
        el: ('#main'),

        events: {
            'click .time-line-item': 'selectMonth',
            'click #btn-left': 'adjustBackwar',
            'click #btn-right': 'adjustForward'
        },

        initialize: function () {
            this.btnLeft = this.$('#btn-left');
            this.btnRight = this.$('#btn-righ');

            this.months = getTimeLine();


            this.render();
        },

        render: function () {
            var currentMonth = xpss.TimeLine.getCurrenMonth(this.months);
            this.selectedMonthLabel = new xpss.SelectedMonthView({
                el: this.$("#selected-month"),
                model: currentMonth
            });

            var fourMonths = xpss.TimeLine.getMonthsFromNow(4, this.months);
            this.timeLine = new xpss.TimeLineView({
                el: this.$("#time-line"),
                collection: new xpss.TimeLine(fourMonths)
            });

            this.details = new xpss.ExpensesView({
                 el: this.$("#details"),
                 collection: new xpss.ExpensesList(currentMonth.get('expenses').models)
            });

            return this;
        },

        selectMonth: function (event) {
            var $element = $(event.currentTarget);
           // $element.addClass('active').siblings().removeClass('active');

            var cid = $element.attr('id');
            var selectedMonth = this.timeLine.collection.get(cid);
            this.selectedMonthLabel.model.set(selectedMonth.toJSON());
            this.details.collection.reset(selectedMonth.get('expenses').models);

        },
        
        adjustBackwar: function (event) {
            this.timeLine.collection.pop();
            var first = this.timeLine.collection.first();
            var prevMonth = xpss.TimeLine.getPrevMonth(first, this.months);
            this.timeLine.collection.unshift(prevMonth);
        },

        adjustForward: function (event) {
            if (!this.timeLine.collection.last().isCurrent()) {
                this.timeLine.collection.shift();
                var last = this.timeLine.collection.last();
                var nextMonth = xpss.TimeLine.getNextMonth(last, this.months);
                this.timeLine.collection.push(nextMonth);
            }
        }
    });
    
    ns.AppView = AppView;

}(window.xpss = window.xpss || {}))