// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //alert(request)
    if (request) {
        displayTransResult(request);
    }
});

let eleFragment = null;

function displayTransResult(result) {


    if (!eleFragment) {
        eleFragment = document.createElement('trans-result');
        eleFragment.className = 'translate-result-display';
        eleFragment.classList.add('animate-top');
        eleFragment.innerHTML =
            `<i>原文：${result.src}</i><hr/> <b>译文：${result.dst}</b>`;
        eleFragment.addEventListener('click', function() {
            if (eleFragment.getBoundingClientRect().top < 0) {
                eleFragment.classList.remove('animate-top')
                eleFragment.offsetWidth = eleFragment.offsetWidth;
                eleFragment.classList.add('animate-top');
            } else {
                eleFragment.remove();
                eleFragment = null;
            }
        })


        document.body.append(eleFragment);
    } else {
        eleFragment.innerHTML =
            `<i>原文：${result.src}</i> <hr/>
            <b>译文：${result.dst}</b>`;
        eleFragment.classList.remove('animate-top')
        eleFragment.offsetWidth = eleFragment.offsetWidth;
        eleFragment.classList.add('animate-top');
    }

}

//
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