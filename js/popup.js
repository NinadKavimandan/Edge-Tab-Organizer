var container = document.getElementById("linkList");
var truncLim = 28;
var tabs = browser.extension.getBackgroundPage().linkInfo;

function genCorspndPrompt(e)
{
  var promptTile = document.createElement("div");
  var addB = document.createElement("div");
  var removeB = document.createElement("div");
  addB.class = 'addTile';
  removeB.class = 'removeTile';
  addB.innerHTML = 'Add to group';
  removeB.innerHTML = 'Remove from list';
  addB.onclick = function(event) { addTileToCat(e, event);};
  removeB.onclick = function(event) { removeLinkFromList(e, event); };
  promptTile.id = 'p'+e;
  promptTile.className = 'catPrompt';
  promptTile.style.display = "none";
  promptTile.appendChild(addB);
  //promptTile.appendChild(removeB);
  return promptTile;
}

function addTileToCat(e, event)
{
  console.log("Yeah will do it soon");
  var valList;
  /*browser.storage.local.get('valList', function(items) {
    alert(String(items));
    valList = items;
  });*/
  valList = JSON.parse(localStorage.getItem('saved'));
  if(!valList) valList = [];
  if(isAddedAlready(tabs[e].title, valList))
  {
    alert("It\'s been added already");
    return;
  }
  valList.push({title: tabs[e].title, url: tabs[e].link});
  //browser.storage.local.set(valList);
  localStorage.setItem("saved", JSON.stringify(valList));
  alert("Added!");
  togglePrompt(e);
  event.stopPropagation();
}

function printSuccess(item)
{
  console.log("It worked!");
}

function erorHandler(err)
{
  console.log("Failed");
}

function isAddedAlready(e, list)
{
  var maxlen = list.length;
  var i=0;
  //alert("Max length: "+maxlen);
  while(i<maxlen)
  {
    if(list[i].title == e) return true;
    i++;
  }
  return false;
}

function removeLinkFromList(e, event)
{
  console.log("Yeah will do it soon");
  event.stopPropagation();
}

function togglePrompt(e, event)
{
  console.log("Tab prompt: "+e);
  var targetPrompt = document.getElementById('p'+e);
  if(targetPrompt.style.display == "none") targetPrompt.style.display = "block";
  else targetPrompt.style.display = "none";
  event.stopPropagation();
}

function loadList()
{
  //var tabs = browser.extension.getBackgroundPage().linkInfo;
  var maxlen = tabs.length;
  var i=0;
  while(i<maxlen)
    {
      var newTile = document.createElement("div");
      newTile.className = "loadedLink";
      var len = tabs[i].title.length;
      var title = tabs[i].title;
      if(len > 29) title = title.substring(0, truncLim) + "..";
      newTile.innerHTML = title;
      newTile.id = i;
      var promptTile = genCorspndPrompt(newTile.id);
      newTile.appendChild(promptTile);
      newTile.onclick = function(event) { togglePrompt(this.id, event); };
      container.appendChild(newTile);
      i++;
    }
}

loadList();

function loadSavedTabs()
{
    browser.runtime.sendMessage({name:'loadTabs'});
}

var isDisplayed = false;

function displaySavedTabs(event)
{
  var valList = JSON.parse(localStorage.getItem('saved'));
  var maxlen = valList.length;
  var i=0;
  var headContainer = document.getElementById("header");
  if(isDisplayed)
  {
    headContainer.innerHTML = "";
    isDisplayed = false;
    event.stopPropagation();
    return;
  }
  while(i<maxlen)
  {
    var newTile = document.createElement("div");
    newTile.className = "loadedLink";
    var len = tabs[i].title.length;
    var title = tabs[i].title;
    if(len > 29) title = title.substring(0, truncLim) + "..";
    newTile.innerHTML = title;
    newTile.id = "h"+i;
    var url = valList[i].url;
    newTile.onclick = function(event) { browser.tabs.create({url: url}); event.stopPropagation();};
    var removeTab = document.createElement("div");
    removeTab.innerHTML = '&#10060';
    removeTab.className = 'settings';
    //alert("i="+i);
    removeTab.onclick = function(event) { removeTabFromSaved(this.id, event); };
    newTile.appendChild(removeTab);
    headContainer.appendChild(newTile);
    i++;
  }
  isDisplayed = true;
  event.stopPropagation();
}

function removeTabFromSaved(i, event)
{
  var valList = JSON.parse(localStorage.getItem('saved'));
  var maxlen = valList.length;
  var tmp = [];
  var t=i.length;
  i = i.substring(1,t);
  t=0;
  console.log(i);
  while(t<maxlen)
  {
    if(t!=i) tmp.push(valList[t]);
    t++;
  }
  //alert("In delete");
  localStorage.setItem('saved', JSON.stringify(tmp));
  document.getElementById("header").innerHTML = "";
  isDisplayed = false;
  //displaySavedTabs();
  event.stopPropagation();
}

document.getElementById("saved").addEventListener("click", loadSavedTabs);
document.getElementById("manage").addEventListener("click", displaySavedTabs);
