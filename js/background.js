let mainMenuId = chrome.contextMenus.create({
    title: 'YSH右键翻译：%s', // %s表示选中的文字
    contexts: ['selection']
})
chrome.contextMenus.create({
    title: '英->汉', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    parentId:mainMenuId,
    onclick: function(onClickData, tab) {
        let tranText = onClickData.selectionText;
        let tabId = tab.id;
        translate(tranText, 'en','zh',function(resp) {
            chrome.tabs.sendMessage(tabId, resp);
        });
    }
});
chrome.contextMenus.create({
    title: '汉->英', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    parentId:mainMenuId,
    onclick: function(onClickData, tab) {
        let tranText = onClickData.selectionText;
        let tabId = tab.id;
        translate(tranText, 'zh','en',function(resp) {
            chrome.tabs.sendMessage(tabId, resp);
        });
    }
});
function translate(transText,fromLang,toLang,callback) {
    let from = fromLang||'en';
    let to = toLang||'zh';
    let result = localStorage.getItem(transText+'['+from+'-'+to+']');
    if(result){
        let resp = JSON.parse(result);
        callback(resp);
    }else{
        sendHttpRequest(transText,from,to,callback);
    }
}

function sendHttpRequest(transText,from,to,callback) {

    let appid = '20171025000090729';
    let key = 'RkJM2wwl4Vos_6ZVtgUu';
    let salt = (new Date).getTime();
    let query = transText;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    
    let str1 = appid + query + salt + key;
    let sign = MD5(str1);

    let xhr = new XMLHttpRequest();
    let url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${query}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`;
    let encodeUrl = encodeURI(url);
    xhr.open("GET", encodeUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status=200){
                // JSON解析器不会执行攻击者设计的脚本.
                let resp = JSON.parse(xhr.responseText).trans_result[0];
                callback(resp);
                let key = query+'['+from+'-'+to+']';
                localStorage.setItem(key,JSON.stringify(resp));
             }else{
                let error = xhr.status+':'+xhr.statusText;
                callback(error);
            }
        }
    }
    xhr.send();
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('收到来自contentscript的消息：');
    //console.log(request, sender, sendResponse);
    //sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});