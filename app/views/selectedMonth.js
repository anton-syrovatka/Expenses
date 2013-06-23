(function (ns, undefined) {
    var SelectedMonthView = Backbone.View.extend({
        
        initialize: function (options) {
            this.model = (options && options.model) || new xpss.Month();
            this.model.on('change', function () {
                this.render();
            }, this);
        },

        render: function () {
            this.$el.html('Selected: ' + this.model.title());

            return this;
        }
    });
    ns.SelectedMonthView = SelectedMonthView;

}(window.xpss = window.xpss || {}))