//browser.runtime.sendMessage({name: 'bounce', payload: {name: 'hello'}});
var pageData = {};
//pageData = appendNewLinks();
var curUrl = document.location.href.toString();
console.log(curUrl);
browser.runtime.sendMessage({name:'urlInfo', payload: {url: curUrl}});
