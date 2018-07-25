var linkInfo = [];
var linkCnt = 0;

var balance = -1;
browser.runtime.onMessage.addListener(function (request, sender) {
  if (request.name === 'loadTabs') {
    //alert("In background script");
    loadBalanceTabs(-1);
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
  if(balance != -1) loadBalanceTabs();
}

function HandleRemove(tabId, changeInfo, tab)
{
  var i=0;
  //alert("Deleting "+tabId);
  while(i<linkCnt)
  {
    if(linkInfo[i].id == tabId)
    {
      //alert("Deleting: "+linkInfo[i].title);
      delete linkInfo[i];
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

function loadBalanceTabs()
{
  var valList = JSON.parse(localStorage.getItem('saved'));
  var maxlen = valList.length;
  balance = balance==-1?0:balance;
  while(balance<maxlen)
  {
    balance++;
    var creating = browser.tabs.create({
      url: valList[balance-1].url
    });
    creating.then(printSuccess, erorHandler);
  }

  balance = -1;
}

browser.tabs.onUpdated.addListener(HandleUpdate);
//browser.tabs.onRemoved.addListener(HandleRemove);
