(function (ns, undefined) {
    var SelectedMonthView = Backbone.View.extend({
        
        initialize: function () {
            this.model.on('change', function () {
                this.render();
            }, this);

            this.render();
        },

        render: function () {
            this.$el.html('Selected: ' + this.model.title());

            return this;
        }
    });
    ns.SelectedMonthView = SelectedMonthView;

}(window.xpss = window.xpss || {}))