(function (ns, undefined) {
    var templates = {
        
        month: '<p><%= title %></p>' +
                      '<p><%= expensesCount %></p>' +
                      '<p><%= totalAmount %> eur</p>',
        
        expenses: '<table id="expenses">' +
                    '<% _.each(model, function(e, index){ %>' + 
                    '<tr>' +
                        '<td><%= index + 1 %></td>' +
                        '<td><%= e.info %></td>' +
                        '<td><%= e.date %></td>' +
                        '<td><%= e.amount %> eur</td>' +
                    '</tr>' +
                    '<% }); %>' +
                 '</table>',
        
        timeLine: '<div id="selected-month"></div>' +
                  '<div id="time-line-filter"></div>' +
                  '<div id="month-expenses"></div>',

        app: 
             '<div><button id="btn-left"><=</button></div>' +
             '<div id="time-line"></div>' +
             '<div><button id="btn-right">=></button></div>'
    };
        
    ns.templates = templates;

}(window.xpss = window.xpss || {}))