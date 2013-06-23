(function (ns, undefined) {
    var TimeLineView = Backbone.View.extend({
        
        events: {
            'click .month': 'onMonthClick'
        },

        template: _.template(xpss.templates.timeLine),

        monthsNumber: 4,
        
        collection: new xpss.TimeLine(),

        initialize: function () {
            //this.currentMonth = xpss.TimeLine.getCurrenMonth(this.collection);
            //this.displayedMonths = xpss.TimeLine.getMonthsFromNow(this.monthsNumber, this.collection);
        },

        render: function () {
            this.$el.html(this.template());
            
            var currentMonth = xpss.TimeLine.getCurrenMonth(this.collection);
            this.selectedMonthLabel = new xpss.SelectedMonthView({
                el: this.$("#selected-month"),
                model: currentMonth
            }).render();
            
            var months = xpss.TimeLine.getMonthsFromNow(this.monthsNumber, this.collection);
            this.timeLineFilter = new xpss.TimeLineFilterView({
                el: this.$("#time-line-filter"),
                collection: new xpss.TimeLine(months)
            }).render();

            this.monthExpenses = new xpss.ExpensesView({
                collection: new xpss.ExpensesList(currentMonth.get('expenses').models)
            });

            this.$("#month-expenses").append(this.monthExpenses.render().el);
            
            this.highLightSelectedMonth();
            return this;
        },

        adjustBackward: function (event) {
            this.timeLineFilter.collection.pop();
            var first = this.timeLineFilter.collection.first();
            var prevMonth = xpss.TimeLine.getPrevMonth(first, this.collection);
            this.timeLineFilter.collection.unshift(prevMonth);
            this.highLightSelectedMonth();
        },

        adjustForward: function (event) {
            if (!this.timeLineFilter.collection.last().isCurrent()) {
                this.timeLineFilter.collection.shift();
                var last = this.timeLineFilter.collection.last();
                var nextMonth = xpss.TimeLine.getNextMonth(last, this.collection);
                this.timeLineFilter.collection.push(nextMonth);
                this.highLightSelectedMonth();
            }
        },

        onMonthClick: function (event) {
            var $element = $(event.currentTarget);
            this.highLightMonthElement($element);

            var cid = $element.attr('id');
            this.setSelectedMonth(cid);
        },
        
        setSelectedMonth: function(id) {
            var selectedMonth = this.timeLineFilter.collection.get(id);
            this.selectedMonthLabel.model.set(selectedMonth.toJSON());
            this.monthExpenses.collection.reset(selectedMonth.get('expenses').models);
        },
        
        highLightSelectedMonth: function () {
            var selectedMonth = this.selectedMonthLabel.model;
            selectedMonth = this.timeLineFilter.collection.findWhere(
                {
                    year: selectedMonth.get('year'),
                    month: selectedMonth.get('month')
                });
            if (selectedMonth) {
                var $element = this.$('.month[id="' + selectedMonth.cid + '"]');
                this.highLightMonthElement($element);
            }
        },
        
        highLightMonthElement: function($element) {
            $element.hasClass('month') && $element.addClass('active').siblings().removeClass('active');
        }
    });

    ns.TimeLineView = TimeLineView;

}(window.xpss = window.xpss || {}))