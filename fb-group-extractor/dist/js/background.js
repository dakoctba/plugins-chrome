//this extention created by ----> fadyAyoobDev@gmail.com

chrome.browserAction.onClicked.addListener(function runClipper(tab) {
    console.log("start");    
    chrome.tabs.sendMessage(tab.id, 'start');
});