define(function (require) {
    var text = require('text');
    var $ = require('jquery');
    var _ = require('underscore');
    var html2canvas = require('html2canvas');
    var receiptConf = JSON.parse(require('text!receipt.config.json'));

    var receiptTemplate = require('text!templates/receipt.html');
    var detailsOnTopTemplate = require('text!templates/type1/detailsOnTop.html');
    var middleLinerTemplate = require('text!templates/type1/middleLiner.html');
    var listItemsTemplate = require('text!templates/type1/listItems.html');
    var detailsOnBottomTemplate = require('text!templates/type1/detailsOnBottom.html');
    var detailsOnTopTemplate = require('text!templates/type2/detailsOnTop.html');
    var middleLinerTemplate = require('text!templates/type2/middleLiner.html');
    var listItemsTemplate = require('text!templates/type2/listItems.html');
    var detailsOnBottomTemplate = require('text!templates/type2/detailsOnBottom.html');

    var typesOfTemplates = receiptConf.typesOfTemplates;
    var numberOfReceipts = receiptConf.numberOfReceipts;
    var templates = [];

    for (typeCount = 1; typeCount <= typesOfTemplates; typeCount++) {
        var detailsOnTopTemplate = require('text!templates/type' + typeCount + '/detailsOnTop.html');
        var middleLinerTemplate = require('text!templates/type' + typeCount + '/middleLiner.html');
        var listItemsTemplate = require('text!templates/type' + typeCount + '/listItems.html');
        var detailsOnBottomTemplate = require('text!templates/type' + typeCount + '/detailsOnBottom.html');

        templates.push({
            detailsOnTop: detailsOnTopTemplate,
            middleLiner: middleLinerTemplate,
            listItems: listItemsTemplate,
            detailsOnBottom: detailsOnBottomTemplate
        });
    }

    var receipt = function () {
        var compiledReceiptTemp;
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
            compiledReceiptTemp = _.template(receiptTemplate)({
                tempSeries: tempSeries,
                detailsOnTop: currentTemplate.detailsOnTop,
                middleLiner: currentTemplate.middleLiner,
                listItems: currentTemplate.listItems,
                detailsOnBottom: currentTemplate.detailsOnBottom
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