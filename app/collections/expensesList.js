(function (ns) {
    var ExpensesList = Backbone.Collection.extends({

        model: ns.Expense,
        
        comparator: 'date'
    });

    ns.ExpensesList = ExpensesList;
    
}(window.xpss = window.xpss || {}))