(function (ns, undefined) {
    var ExpensesView = Backbone.View.extend({

        tagName: 'table',
        
        id: 'expenses',

        collection: new xpss.ExpensesList(),

        template: _.template(xpss.templates.expense),

        initialize: function (options) {
            
            this.collection.on('reset', function() {
                this.render();
            }, this);
        },

        render: function () {
            this.$el.empty();

            _.each(this.collection.models, function (e, index) {
                var expense = e.toJSON();
                expense.date = expense.date.format('MMM DD');
                expense.index = index;
                this.$el.append(this.template(expense));
            }, this);
            return this;
        },
        
        addExpense: function (expense) {
            this.$el.append(this.template(expense));
        }
    });
    
    ns.ExpensesView = ExpensesView;

}(window.xpss = window.xpss || {}))