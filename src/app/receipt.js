define(function (require) {
    var text = require('text');
    var $ = require('jquery');
    var _ = require('underscore');
    var html2canvas = require('html2canvas');
    var receiptConf = JSON.parse(require('text!receipt.config.json'));
    var shuffle = require('shuffle');

    var receiptTemplate = require('text!templates/receipt.html');
    var type1 = require('text!templates/type1.html');
    var type2 = require('text!templates/type2.html');

    var typesOfTemplates = receiptConf.typesOfTemplates;
    var numberOfReceipts = receiptConf.numberOfReceipts;
    var templates = [];

    for (typeCount = 1; typeCount <= typesOfTemplates; typeCount++) {
        var template = require('text!templates/type' + typeCount + '.html');
        templates.push(template);
    }

    var receipt = function () {
        var tempSeries = 1;

        var downloadReceipts = function () {
            html2canvas(document.querySelector('.wrapper' + tempSeries)).then(canvas => {
                var receipt = canvas.toDataURL();
                var link = document.createElement('a');
                link.download = 'receipt' + tempSeries + '.png';
                link.href = receipt;
                document.body.appendChild(link);
                link.click();
                tempSeries++;
                if (tempSeries <= numberOfReceipts) {
                    downloadReceipts();
                }
            });
        };

        var createTemplate = function (tempSeries, typeCount) {
            var currentTemplate = templates[typeCount - 1];
            var compiledCurrentTemp = _.template(currentTemplate)({
                meta: new shuffle().getRandomList()
            });
            var compiledReceiptTemp = _.template(receiptTemplate)({
                tempSeries: tempSeries,
                template: compiledCurrentTemp
            });

            $('body').append(compiledReceiptTemp);
        };

        var generateTemplates = function () {
            var tempSeries = 0;
            for (tempCount = 1; tempCount <= numberOfReceipts / typesOfTemplates; tempCount++) {
                for (typeCount = 1; typeCount <= typesOfTemplates; typeCount++) {
                    tempSeries++;
                    createTemplate(tempSeries, typeCount);
                }
            }
        };

        this.triggerTemplateGen = function () {
            generateTemplates();
            downloadReceipts();
        };

        this.hide = function () {
            $('body').html = '';
        };

    };

    return receipt;
})