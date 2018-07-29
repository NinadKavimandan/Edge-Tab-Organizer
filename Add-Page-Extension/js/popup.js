var savedTabs = [];

function addToGroup(group, event)
{
  var url = browser.tabs.getSelected();
  var func = browser.runtime.getBackgroundPage(function(page) { sendAdditionReq(url, group, page); });
}

function sendAdditionReq(url, group, page)
{
  page.sendGroupTabInfo(url, group);
}

function success(page)
{
  var container = document.getElementById("container");
  console.log("It worked");
  savedTabs = page.saved;
  var maxlen = savedTabs.length;
  console.log(maxlen);
  var i=0;
  while(i<maxlen)
  {
    var newTile = document.createElement("div");
    newTile.className = "savedTabs";
    newTile.id = savedTabs[i];
    var tmp = i;
    newTile.onclick = function(event) { addToGroup(saved[tmp], event) };
    container.appendChild(newTile);
    i++;
  }
}

function failed()
{
  console.log("It failed");
}

function loadExistingTabs()
{
  var bg = browser.runtime.getBackgroundPage(function(page) {success(page)});
}

//browser.runtime.getBackgroundPage(function(page) {page.fetchSavedGroupNames();} );
loadExistingTabs();
