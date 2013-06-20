(function (ns, undefined) {
    var ExpensesView = Backbone.View.extend({

        template: _.template($("#expenses-tmpl").html()),

        initialize: function () {
            this.collection.on('reset', function() {
                this.render();
            }, this);

            this.render();
        },

        render: function () {
            var expenses = _.map(this.collection.models, function (expense) {
                var e = expense.toJSON();
                e.date = e.date.format('MMM DD');
                return e;
            });
            this.$el.html(this.template({ model: expenses }));

            return this;
        }
    });
    ns.ExpensesView = ExpensesView;

}(window.xpss = window.xpss || {}))