describe("SelectedMonthView", function () {

    beforeEach(function () {
        this.view = new xpss.SelectedMonthView();
    });

    describe("when rendered", function () {

        beforeEach(function () {
            this.view.model.set({year: 2013, month: 3});
            this.monthHtml = "Selected: Apr '13";
        });

        it("should display month info", function () {
            expect(this.view.render().$el)
                .toHaveHtml(this.monthHtml);
        });
    });
});

describe("MonthView", function () {

    beforeEach(function () {
        this.view = new xpss.MonthView();
    });
    
    describe("when rendered", function () {
        
        beforeEach(function () {
            this.month = new xpss.Month({
                year: 2013,
                month: 3,
                expenses: new xpss.ExpensesList([
                    { amount: 4 },
                    { amount: 3 },
                    { amount: 2.1 }
                ])
            });
            this.view.model = this.month;
            this.monthHtml = (_.template(xpss.templates.month)({
                title: "Apr '13",
                totalAmount: 9.1,
                expensesCount: 3
            }));
        });

        it("should display grouped results", function () {
            expect(this.view.render().$el)
                .toHaveHtml(this.monthHtml);
        });
    });
});

describe("TimeLineFilterView", function () {

    beforeEach(function () {
        this.view = new xpss.TimeLineFilterView();
    });
    
    describe("when rendered", function () {

        beforeEach(function () {
            this.monthView = new Backbone.View();
            this.monthViewStub = sinon
                .stub(window.xpss, "MonthView")
                .returns(this.monthView);

            this.monthRenderSpy = sinon.spy(this.monthView, "render");

            this.month1 = new xpss.Month();
            this.month2 = new xpss.Month();
            this.month3 = new xpss.Month();
            
            this.view.collection = new Backbone.Collection([
              this.month1,
              this.month2,
              this.month3
            ]);
            this.view.render();
        });

        afterEach(function () {
            window.xpss.MonthView.restore();
        });

        it("should create required number of months", function () {
            expect(this.monthViewStub.calledThrice).toBeTruthy();

            expect(this.monthViewStub
              .calledWith({ model: this.month1 })).toBeTruthy();
            expect(this.monthViewStub
              .calledWith({ model: this.month2 })).toBeTruthy();
            expect(this.monthViewStub
              .calledWith({ model: this.month3 })).toBeTruthy();
        });

        it("should render each months", function () {
            expect(this.monthView.render.calledThrice).toBeTruthy();
        });
    });
});

describe("TimeLineView", function () {

    beforeEach(function () {
        this.view = new xpss.TimeLineView();
        setFixtures('<div id="main">');
    });

    describe("when rendered", function() {

        beforeEach(function () {
            this.monthView = new Backbone.View();
            this.monthViewStub = sinon
                .stub(window.xpss, "MonthView")
                .returns(this.monthView);

            this.monthRenderSpy = sinon.spy(this.monthView, "render");
            this.highLightSelectedMonthSpy = sinon.spy(this.view, "highLightSelectedMonth");
            this.selectedMonthLabelSpy = sinon.spy(window.xpss, "SelectedMonthView");

            this.view.collection = new xpss.TimeLine();
            this.view.render();
        });
        
        afterEach(function () {
            window.xpss.MonthView.restore();
            window.xpss.SelectedMonthView.restore();
        });
        
        it("should display 4 months", function () {
            expect(this.monthView.render.callCount).toEqual(4);
        });

        it("should have current month selected", function () {
            expect(this.selectedMonthLabelSpy.calledOnce).toBeTruthy();
            expect(this.view.selectedMonthLabel.model.isCurrent()).toBeTruthy();
            expect(this.view.highLightSelectedMonth.calledOnce).toBeTruthy();
        });
    });


    describe("when month clicked ", function () {

        beforeEach(function () {
            this.expensesView = new Backbone.View();
            this.expensesViewStub = sinon
                .stub(window.xpss, "ExpensesView")
                .returns(this.expensesView);

            this.expensesView.collection = new xpss.ExpensesList();

            this.view.collection = new xpss.TimeLine({});
            this.view.render();

            $('#main').append(this.view.el);
            this.month = $('#main .month:first');
            this.month.trigger('click');
        });

        afterEach(function () {
            window.xpss.ExpensesView.restore();
        });
        
        it("should display it's expenses", function () {
            expect(this.expensesViewStub.calledOnce).toBeTruthy();
        });
    });
    
    describe("when filter adjusted backward ", function () {

        beforeEach(function () {
            this.view.render();
            sinon.spy(this.view.timeLineFilter, "render");
            this.popSpy = sinon.spy(this.view.timeLineFilter.collection, "pop");
            this.unshiftSpy = sinon.spy(this.view.timeLineFilter.collection, "unshift");
            this.view.adjustBackward();
        });

        it("should shift one month back", function () {
            expect(this.popSpy.calledOnce).toBeTruthy();
            expect(this.unshiftSpy.calledOnce).toBeTruthy();
            expect(this.popSpy.calledBefore(this.unshiftSpy)).toBeTruthy();
            expect(this.view.timeLineFilter.render.calledOnce).toBeTruthy();
        });
    });

    describe("when filter adjusted forward ", function () {

        beforeEach(function () {
            this.view.render();
            this.view.adjustBackward();
            sinon.spy(this.view.timeLineFilter, "render");
            this.pushSpy = sinon.spy(this.view.timeLineFilter.collection, "push");
            this.shiftSpy = sinon.spy(this.view.timeLineFilter.collection, "shift");
            this.view.adjustForward();

        });
        
        it("should shift one month forth", function () {
            expect(this.pushSpy.calledOnce).toBeTruthy();
            expect(this.shiftSpy.calledOnce).toBeTruthy();
            expect(this.pushSpy.calledAfter(this.shiftSpy)).toBeTruthy();
            expect(this.view.timeLineFilter.render.calledOnce).toBeTruthy();
        });
    });
});

describe("AppView", function() {

    beforeEach(function () {
        setFixtures('<div id="container"></div>');
        this.view = new xpss.AppView();
    });

    describe("when back button clicked", function() {

        beforeEach(function () {
            this.timeLineView = new Backbone.View();
            this.timeLineView.adjustBackward = function() {};
            this.adjustBackwardSpy = sinon.spy(this.timeLineView, "adjustBackward");

            this.timeLineViewStub = sinon
                .stub(window.xpss, "TimeLineView")
                .returns(this.timeLineView);

            $('#container').append(this.view.render().el);
            $('#btn-left').trigger('click');
        });

        afterEach(function() {
            window.xpss.TimeLineView.restore();
        });

        it("shoul adjust timeline filter backward", function() {
            expect(this.adjustBackwardSpy.calledOnce).toBeTruthy();
        });
    });

    describe("when forth button clicked", function () {

        beforeEach(function () {
            this.timeLineView = new Backbone.View();
            this.timeLineView.adjustForward = function () { };
            this.adjustForwardSpy = sinon.spy(this.timeLineView, "adjustForward");

            this.timeLineViewStub = sinon
                .stub(window.xpss, "TimeLineView")
                .returns(this.timeLineView);

            $('#container').append(this.view.render().el);
            $('#btn-right').trigger('click');
        });

        afterEach(function () {
            window.xpss.TimeLineView.restore();
        });

        it("shoul adjust timeline filter forward", function() {
            expect(this.adjustForwardSpy.calledOnce).toBeTruthy();
        });
    });
});