//var targetExt = "TabOrgani_F6DAAAC4E6A641E086DDAA28D5F10628";
var targetExt = "TabOrgani_77A103991A4D45F898A246C4AABD867A";
var saved = [];

function sendTabInfo(tab)
{
    browser.runtime.sendMessage(targetExt, tab.url, function(res) {
        console.log("Trying to get it done");
    });
}

function sendGroupTabInfo(url, group)
{
  alert("Got the url: "+url);
}

function showPageAction(tabId, changeInfo, tab)
{
    browser.pageAction.show(tabId);
}

function fetchSavedGroupNames()
{
  var req = "saved";
  browser.runtime.sendMessage(targetExt, req, function(res) {
    var maxlen = res.tabs.length;
    var i=0;
    while(i<maxlen)
    {
      saved.push(res.tabs[i]);
      i++;
    }

    alert("Saved groups: "+String(saved));
  });
}

fetchSavedGroupNames()
//browser.pageAction.onClicked.addListener(sendTabInfo);
browser.tabs.onUpdated.addListener(showPageAction);
