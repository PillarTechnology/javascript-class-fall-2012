window.CalculatorView2 = Backbone.View.extend({
    events: {
        'click .verbatim': 'clickVerbatim',
        'click .operator': 'clickOperator'
    },
    render: function() {
        var html = [];
        html.push('<input type="text" disabled="disabled" class="display" /><br />');
        _.each(this.model.buttons, function(buttonRow) {
            _.each(buttonRow, function(b) {
                var clazz = 'verbatim';
                var data_operator = "";
                if (b.operator) {
                    clazz = 'operator';
                    data_operator = 'data-operator="' + b.operator + '"';
                }
                html.push("<button class='" + clazz + "'" + data_operator + ">" + b.label + "</button>");
            });
            html.push("<br />");
        });
        this.$el.html(html.join(""));
        return this;
    },

    clickVerbatim: function(ev) {
        var display = this.$el.find('.display');
        this.model.storage2 = null;
        var buttonText = $(ev.currentTarget).text();
        var oldValue = display.val();
        var newValue = oldValue;
        if (oldValue.indexOf('.') === -1 || buttonText !== '.') {
            newValue = oldValue + buttonText;
        }
        while (newValue.length > 1 && newValue.indexOf('0') == 0) {
            if (newValue.length > 2 || buttonText !== '.') {
                newValue = newValue.substring(1);
            } else {
                break;
            }
        }
        display.val(newValue);
    },

    clickOperator: function(ev) {
        var display = this.$el.find('.display');
        var op = $(ev.currentTarget).attr('data-operator');
        if (op === 'clear') {
            display.val('0');
        } else if (op === 'equal') {
            if (this.model.storage2 === null) {
                this.model.storage2 = Number(display.val())
            }
            this.model.calculator[this.model.operator](this.model.storage, this.model.storage2);
            this.model.storage = this.model.calculator.lastResult();
            display.val(this.model.storage);
        } else {
            this.model.storage = Number(display.val());
            this.model.operator = op;
            display.val('');
        }
    }
});
