// content.js
	
	var nodeList = document.getElementsByTagName("input");
for (item in nodeList) {
	console.log(nodeList[item]);
	try {
		if(nodeList[item].getAttribute("type") == "password") {
			nodeList[item].setAttribute("id", "PASS");
		}
	} catch(err) {}
};

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
    function useToken(userid) {
        console.log(userid);
    }
});

var p = document.getElementById("PASS");
p.onclick = function(event) {alert("yo");};