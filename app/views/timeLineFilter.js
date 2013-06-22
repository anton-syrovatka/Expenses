(function (ns, undefined) {
    var TimeLineFilterView = Backbone.View.extend({
        collection: new xpss.TimeLine(),

        initialize: function () {
            this.collection.on('reset', function() {
                this.render();
            }, this);

            this.collection.on('add', function() {
                this.render();
            }, this);
        },

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function(month) {
                this.$el.append(new xpss.MonthView({ model: month }).render().el);
            }, this);
            return this;
        }
    });

    var MonthView = Backbone.View.extend({
        template: _.template(xpss.templates.month),

        className: 'month',

        model: new xpss.Month(),

        render: function() {
            this.$el.attr('id', this.model.cid);
            this.$el.html(this.template({
                title: this.model.title(),
                expensesCount: this.model.expensesCount(),
                totalAmount: this.model.totalAmount()
            }));
            return this;
        }
    });

    ns.TimeLineFilterView = TimeLineFilterView;
    ns.MonthView = MonthView;

}(window.xpss = window.xpss || {}));