//var targetExt = "TabOrgani_F6DAAAC4E6A641E086DDAA28D5F10628";
var targetExt = "TabOrgani_77A103991A4D45F898A246C4AABD867A";
function sendTabInfo(tab)
{
    browser.runtime.sendMessage(targetExt, tab.url, function(res) {
        console.log("Trying to get it done");
    });
}

function showPageAction(tabId, changeInfo, tab)
{
    browser.pageAction.show(tabId);
}

browser.pageAction.onClicked.addListener(sendTabInfo);

browser.tabs.onUpdated.addListener(showPageAction);
