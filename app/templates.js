(function (ns, undefined) {
    var templates = {
        
        month: '<p><%= title %></p>' +
               '<p><%= expensesCount %></p>' +
               '<p><%= totalAmount %> eur</p>',
        
        expense:   '<tr>' +
                        '<td><%= index + 1%></td>' +
                        '<td><%= info %></td>' +
                        '<td><%= date %></td>' +
                        '<td><%= amount %> eur</td>' +
                    '</tr>',
        
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