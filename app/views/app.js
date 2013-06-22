(function (ns, undefined) {
    var AppView = Backbone.View.extend({
        
        id: 'main',

        template: _.template(xpss.templates.app),

        events: {
            'click #btn-left': 'onLeftButtonClick',
            'click #btn-right': 'onRightButtonClick'
        },

        initialize: function () {
            this.btnLeft = this.$('#btn-left');
            this.btnRight = this.$('#btn-righ');

            this.months = getTimeLine();
        },

        render: function () {
            this.$el.html(this.template());
            this.timeLine = new xpss.TimeLineView({
                el: this.$("#time-line"),
                collection: this.months
            }).render();

            return this;
        },
        
        onLeftButtonClick: function (event) {
            this.timeLine.adjustBackward(event);
        },

        onRightButtonClick: function (event) {
            this.timeLine.adjustForward(event);
        }
    });
    
    ns.AppView = AppView;

}(window.xpss = window.xpss || {}))