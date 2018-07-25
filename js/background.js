var linkInfo = [];
var linkCnt = 0;

browser.runtime.onMessage.addListener(function (request, sender) {
  if (request.name === 'bounce') {
    var curUrl = document.location.href;
    browser.tabs.sendMessage(sender.tab.id, {url: curUrl});
  }
  else if(request.name == 'urlInfo') {
    if(isPresent(request.payload.title)) return;
    var tmpObj = {};
    tmpObj.title = request.payload.title;
    tmpObj.link = request.payload.url;
    linkInfo.push(tmpObj);
    console.log("Url: "+tmpObj.link+" Title: "+tmpObj.title);
  }
});

function isPresent(tab)
{
    var i=0;
    while(i<linkCnt)
    {
      if(linkInfo[i].link == tab.url)
      {
        if(linkInfo[i].title != tab.title) linkInfo[i].title = tab.title;
        return true;
      }
      i++;
    }
    return false;
}

function HandleUpdate(tabId, changeInfo, tab)
{
  if(isPresent(tab)) return;
  var tmpObj = {};
  tmpObj.title = tab.title;
  tmpObj.link = tab.url;
  tmpObj.id = tabId;
  linkInfo.push(tmpObj);
  linkCnt++;
}

function HandleRemove(tabId, changeInfo, tab)
{
  var i=0;
  alert("Deleting "+tabId);
  while(i<linkCnt)
  {
    if(linkInfo[i].id == tabId)
    {
      alert("Deleting: "+linkInfo[i].title);
      delete linkInfo[i];
      linkCnt--;
      break;
    }
    i++;
  }
}

function HandleReplace(tabId, changeInfo, tab)
{
  var i=0;
  while(i<linkCnt)
  {
    if(linkInfo[i].id == tabId)
    {
      linkInfo[i].link = tab.
      break;
    }
    i++;
  }
}

browser.tabs.onUpdated.addListener(HandleUpdate);
chrome.tabs.onRemoved.addListener(HandleRemove);
//chrome.tabs.onReplaced.addListener(HandleReplace);
