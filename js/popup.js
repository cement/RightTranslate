let background = chrome.extension.getBackgroundPage();
let textarea = document.getElementById('translate-text');
let submit = document.getElementById('translate-submit');
let transtype = document.getElementById('translate-form');

textarea.onclick = function() {
    textarea.value = '';
}
transtype.onchange = function () {
    textarea.value = '';
}
submit.onclick = function(event) {
    let tranText = textarea.value.trim();
    let transTo = transtype.transto.value;
    transFrom = transTo==='zh'?'en':'zh';
    if(!tranText||tranText==='请输入原文'){
        textarea.value = '请输入原文';
        return;
    }
    let result = localStorage.getItem(tranText+'['+transFrom+'-'+transTo+']');
    
    background.translate(tranText, transFrom,transTo,function(resp) {
        textarea.value = '';
        textarea.value = `译文：\n${resp.dst}`;
    });
        
}