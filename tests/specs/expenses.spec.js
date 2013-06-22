
describe("TimeLineFilterView", function () {

    beforeEach(function () {
        this.view = new xpss.TimeLineFilterView();
    });
    
    describe("when rendered", function () {

        beforeEach(function () {
            this.monthView = new Backbone.View();
            //this.monthRenderSpy = sinon.spy(this.monthView, "render");
            //debugger 
            this.monthViewStub = sinon.stub(window.xpss, "MonthView")
              .returns(this.monthView);

            this.month1 = new xpss.Month();
            this.month2 = new xpss.Month();
            this.month3 = new xpss.Month();
            this.month4 = new xpss.Month();
            
            this.view.collection = new Backbone.Collection([
              this.month1,
              this.month2,
              this.month3,
              this.month4
            ]);
            
            this.view.render();
        });

        afterEach(function () {
            window.xpss.MonthView.restore();
        });

        it("should show 4 month", function () {
            expect(this.monthViewStub.callCount).toEqual(4);

            expect(this.monthViewStub
              .calledWith({ model: this.month1 })).toBeTruthy();
            expect(this.monthViewStub
              .calledWith({ model: this.month2 })).toBeTruthy();
            expect(this.monthViewStub
              .calledWith({ model: this.month3 })).toBeTruthy();
            expect(this.monthViewStub
              .calledWith({ model: this.month4 })).toBeTruthy();
        });
    });
});