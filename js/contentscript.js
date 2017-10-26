// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    //alert(JSON.stringify(request));
    displayTransResult(request);
// 	sendResponse('我收到你的消息了：'+JSON.stringify(request));
// }
});


var tipCount = 0;
function displayTransResult(result) {
    if(!result) return;
    //let fragment = document.createDocumentFragment('trans-result');
    var ele = document.createElement('div');
    ele.className = 'chrome-plugin-simple-tip slideInLeft';
    //ele.setAttribute('id', 'trans-display');
    ele.style.top = tipCount * 70 + 20 + 'px';
    ele.innerHTML = 
       ` <div id='trans-dispaly-block'>
        <i>原文：${result.trans_result[0].src}</i>
        <hr/>
        <b>译文：${result.trans_result[0].dst}</b>
        </div>`;
    //fragment.append(ele);
    ele.classList.add('animated');
    ele.addEventListener('click',function(){
        ele.remove();
    })
    document.body.append(ele);
    tipCount++;
    setTimeout(() => {
        ele.style.top = '-100px';
        setTimeout(() => {
            ele.remove();
            tipCount--;
        }, 500);
    }, 10000);
}

// 简单的消息通知
// function tip(info) {
//     info = info || '';
//     var ele = document.createElement('div');
//     ele.className = 'chrome-plugin-simple-tip slideInLeft';
//     ele.style.top = tipCount * 70 + 20 + 'px';
//     ele.innerHTML = `<div>${info}</div>`;
//     document.body.appendChild(ele);
//     ele.classList.add('animated');
//     tipCount++;
//     setTimeout(() => {
//         ele.style.top = '-100px';
//         setTimeout(() => {
//             ele.remove();
//             tipCount--;
//         }, 400);
//     }, 3000);
// }