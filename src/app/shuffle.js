define(function (require) {
    var text = require('text');
    var metaData = JSON.parse(require('text!data/meta.json'));

    var receipt = function () {

        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var shuffleArray = function (arr) {
            for (i = arr.length - 1; i > 0; i--) {
                var j = getRandomInt(0, i);
                var swap = arr[i];
                arr[i] = arr[j];
                arr[j] = swap;
            }

            return arr;
        };

        var generateArray = function (arr, len) {
            var arrLength = arr.length;
            if (arrLength >= len) {
                return arr.slice(0, len);
            } else if (arrLength < len) {
                var diffLength = len - arrLength;
                return shuffleArray(arr.concat(arr.slice(0, diffLength)));
            }
        };

        var mixItems = function (genItems, specItems) {
            var genMin = getRandomInt(0, Math.round(genItems.length / 2));
            var genMax = getRandomInt(Math.round(genItems.length / 2), genItems.length);
            var specMin = getRandomInt(0, Math.round(specItems.length / 2));
            var specMax = getRandomInt(Math.round(specItems.length / 2), specItems.length);

            var genSubset = genItems.slice(genMin, genMax);
            var specSubset = specItems.slice(specMin, specMax);

            return shuffleArray(genSubset.concat(specSubset));
        };

        this.getRandomList = function () {
            shuffleArray(metaData.itemDescriptions);
            shuffleArray(metaData.companySpecificItems);
            var mixedItems = mixItems(metaData.itemDescriptions, metaData.companySpecificItems);
            var itemsLength = mixedItems.length;
            var randomizedMetaData = {
                logo: metaData.logo,
                address: metaData.address,
                billInfo: metaData.billInfo,
                subTotal: metaData.subTotal,
                total: metaData.total,
                debitTend: metaData.debitTend,
                changeDue: metaData.changeDue,
                items: mixedItems,
                itemIds: generateArray(metaData.itemIds, itemsLength),
                itemTypes: generateArray(metaData.itemTypes, itemsLength),
                itemPrices: generateArray(metaData.itemPrices, itemsLength)
            }

            return randomizedMetaData;
        };

    };

    return receipt;
})