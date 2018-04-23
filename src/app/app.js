// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
require.config({
    baseUrl: "app",
    paths: {
        "text": "libs/text",
        "jquery": "libs/jquery.min",
        "underscore": "libs/underscore.min",
        "html2canvas": "libs/html2canvas.min"
    },
    shim: {
        "text": {
            exports: "text"
        },
        "jquery": {
            exports: "$"
        },
        "underscore": {
            deps: ["jquery"],
            exports: '_'
        },
        "html2canvas": {
            exports: "html2canvas"
        }
    }
});

require(['receipt'], function (receipt) {
    var rec = new receipt();
    rec.triggerTemplateGen();
});
