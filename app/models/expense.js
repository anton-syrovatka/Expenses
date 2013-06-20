(function (ns, undefined) {
    var Expense = Backbone.Model.extend({});
    
    var ExpensesList = Backbone.Collection.extend({

        model: Expense
    });
    
    ns.Expense = Expense;
    ns.ExpensesList = ExpensesList;
    
}(window.xpss = window.xpss || {}))