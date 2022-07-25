
var tablist = [];
var downloadedlist = [];
console.log("+++++++++Starting service+++++++++");
document.getElementById("log").innerHTML += "<div>+++++++++Starting service+++++++++</div>";
var mode='simple';
// simple.onclick= function simple(){mode='simple';}
// insta.onclick= function simple(){mode='insta';}
// html.onclick= function simple(){mode='html';}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("+++++Iterating+++++");
    document.getElementById("log").innerHTML += "<div>+++++Iterating+++++</div>";
    if (changeInfo.status === 'loading') {
        chrome.windows.getAll({
            populate: true
        }, function(windows) {
            windows.forEach(function(window) {
                window.tabs.forEach(function(tab) {
                    //collect all of the urls here, I will just log them instead


                    if (mode=='simple'){ 
                    if (tablist.indexOf(tab.url) !== -1) {} else {
                        console.log("adding " + tab.url + "to Active Tab List");
                        document.getElementById("log").innerHTML += "<div><div class='info'></div>adding <span class='url'>" + tab.url + "</span> to Active Tab List</div>";
                        tablist.push(tab.url);
                    }
                    if (downloadedlist.indexOf(tab.url) !== -1) {} else {
                        for (i in tablist) {
                            if (
                                tablist[i].includes('.png') 
                                || tablist[i].includes('.jpg') 
                                || tablist[i].includes('.JPG') 
                                || tablist[i].includes('.jpeg')
                                || tablist[i].includes('.webp')
                                || tablist[i].includes('.gif')
                                ) {
                                if (downloadedlist.indexOf(tablist[i]) == -1) {
                                    downloadedlist.push(tablist[i]);
                                    console.log("downloading " + tablist[i] + "to disk");
                                    document.getElementById("log").innerHTML += "<div><div class='info'></div>downloading <span class='url'>" + tablist[i] + "</span> to disk</div>";
                                    chrome.downloads.download({
                                        url: tablist[i]
                                    });
                                    console.log("removing " + tablist[i] + "tab");
                                    document.getElementById("log").innerHTML += "<div><div class='info'></div>removing <span class='url'>" + tablist[i] + "</span> tab</div>";
                                    chrome.tabs.remove(tab.id);
                                }
                            }
                        }
                    }
                }
                else if (mode=='insta'){
                	
					var callback = function(html_string) {
					    console.log('HTML string, from extension: ', html_string);
					};
					chrome.tabs.create({
					    url: tablist[i]
					}, function(tab) {
					    getSourceFromTab(tab.id, callback);
					});
                }
                else if (mode=='html'){console.log("su");}
                else {console.log("su else");}


                });
            });
        });
    };
});




