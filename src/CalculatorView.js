var CalculatorView = function (calculator) {
    this.calculator = calculator;
};

CalculatorView.prototype.init = function (c) {
    var wrapper = $(c);
    var display = wrapper.find('.display');
    wrapper.find('button.verbatim').click(jQuery.proxy(function (ev) {
        this.storage2 = null;
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
    }, this));

    wrapper.find('button.clear').click(function (ev) {
        display.val('0');
    });

    wrapper.find('button.equal').click(jQuery.proxy(function (ev) {
        if (this.storage2 === null) {
            this.storage2 = Number(display.val())
        }
        this.calculator[this.operator](this.storage, this.storage2);
        this.storage = this.calculator.lastResult();
        display.val(this.storage);
    }, this));

    wrapper.find('button.operator').click(jQuery.proxy(function (ev) {
        this.storage = Number(display.val());
        this.operator = $(ev.currentTarget).attr('data-operator');
        display.val('');
    }, this));
};

window.CalculatorView = CalculatorView;