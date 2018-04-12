function PrintDiv() {
    html2canvas(document.querySelector("#wrapper")).then(canvas => {
        var myImage = canvas.toDataURL();
        downloadURI(myImage, "MaSimulation.png");
    });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
}