var container = document.getElementById("linkList");
var wrapper = document.getElementById("wrapper");
browser.runtime.onMessage.addListener(function(request, sender) {
    if(request.name == "urlInfo")
    {
      if(!isNewEntry(request.payload.url)) return;
      var newTile = document.createElement("div");
      newTile.className = "loadedLink";
      newTile.innerHTML = request.payload.url;
      container.appendChild(newTile);
    }

    else if(request.name == "toggle")
    {
      if(request.payload.flag) wrapper.style.display = "none";
      else wrapper.style.display = "block";
    }
});

function isNewEntry(ele)
{
  var existingLinks = document.getElementsByClassName("loadedLink");
  console.log(existingLinks.length);
  var i=0;
  while(i<existingLinks.length)
  {
    console.log(existingLinks[i].innerHTML);
    if(existingLinks[i].innerHTML == String(ele)) return false;
    i++;
  }
  return true;
}
