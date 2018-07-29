var targetExt = "Taporazzi_F25237DE727041DFB8DB43927BF665F0";
//var targetExt = "TabOrgani_77A103991A4D45F898A246C4AABD867A";
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
  var req = {};
  req['url'] = tab.url;
  req['group'] = group;
  browser.runtime.sendMessage(targetExt, req, function(res) {
    console.log("Trying to get it done");
});
}

function showPageAction(tabId, changeInfo, tab)
{
    browser.pageAction.show(tabId);
}

function fetchSavedGroupNames()
{
  var req = "saved";
  browser.runtime.sendMessage(targetExt, req, function(res) {
    if(!res) return;
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
