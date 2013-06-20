(function (ns, undefined) {
    var TimeLineView = Backbone.View.extend({
        
        initialize: function () {
            this.collection.on('reset', function () {
                this.render();
            }, this);
            
            this.collection.on('add', function () {
                this.render();
            }, this);

            this.render();
        },

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function(timeLineItem) {
                this.$el.append(new TimeLineItemView({ model: timeLineItem }).render().el);
            }, this);
            return this;
        }
    });

    var TimeLineItemView = Backbone.View.extend({

        template: _.template($('#time-line-item-tmpl').html()),
        
        className: 'time-line-item',

        render: function () {
            this.$el.attr('id', this.model.cid);
            this.$el.html(this.template({
                title: this.model.title(),
                expensesCount: this.model.expensesCount(),
                totalAmount: this.model.totalAmount()
            }));
            return this;
        }
    });

    ns.TimeLineView = TimeLineView;
    ns.TimeLineItemView = TimeLineItemView;
    
}(window.xpss = window.xpss || {}))