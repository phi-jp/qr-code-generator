/*
 * global
 */
var eQRCodeImg = null;

var title   = null;
var eURL    = null;
var eSize   = null;
var eColor  = null;

var eOut    = null;
var eTweet  = null;

/*
 * main
 */
tm.main(function() {
    init();
});


/*
 * init
 */
var init = function() {
    eQRCodeImg = tm.dom.Element("#qr-code-img");
    
    eURL    = tm.dom.Element("#url");
    eSize   = tm.dom.Element("#size");
    eColor  = tm.dom.Element("#color");
    
    eOut    = tm.dom.Element("#out");
    eTweet  = tm.dom.Element("#tweet");
    
    var changeFunc = function() {
        createQRCode(eURL.value, eSize.value, eColor.value);
    };
    
    eURL.event.add("change", changeFunc);
    eSize.event.add("change", changeFunc);
    eColor.event.add("change", changeFunc);
    
    chrome.tabs.getSelected(null, function(tab) {
        title = tab.title;
        eURL.value = tab.url;
        
        changeFunc();
    });
    
    eQRCodeImg.event.click(createWindow);
    eTweet.event.click(createWindow);
};


/*
 * create qr code
 */
var createQRCode = function(url, size, color) {
    var qrCode = tm.google.Chart.createQRCode(size, url, color);
    eQRCodeImg.attr.set("src", qrCode);
    
    eOut.value = qrCode;
    
    //console.log(qrCode);
};

/*
 * 
 */
var createWindow = function() {
    var url = tm.social.Twitter.createURL({
        type: "tweet",
        text: "『{0}』".format(title),
        url: eOut.value,
        hashtags: "qrcode"
    });
    
    chrome.windows.create({
        url: url,
        width: 500,
        height: 500,
    });
};
