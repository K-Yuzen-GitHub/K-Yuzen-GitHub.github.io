var imgPrefix = "fluent";
var clickCounter = 0;
var clickPlus = 1;
var timer = 0.000

let disableTextRewrite = false
let gameInfo = {
    version: "v1.2.0",
    buildNumber: "20250720-120"
}
let imgEle = document.querySelector(".emoji");
let countText = document.querySelector(".clickCount");
let lvupBtns = {
    clickUp: document.querySelector(".upClick")
}
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒
let previousCounter = 0;

function updateImg(prefix) {
    imgPrefix = prefix;
    imgEle.src = `./thinking-face_${imgPrefix}.png`;
    console.log(`Update image prefix to ${imgPrefix}.`);
}

function updateCounter() {
    const delta = clickCounter - previousCounter;

    // アニメーションクラスを一旦削除（再適用のため）
    countText.classList.remove("count-flash-up", "count-flash-down");
    void countText.offsetWidth; // 強制再描画（再アニメ適用の裏ワザ）

    if (delta > 0) {
        countText.classList.add("count-flash-up");
    } else if (delta < 0) {
        countText.classList.add("count-flash-down");
    }

    countText.textContent = `Count: ${clickCounter}`;
    previousCounter = clickCounter;
}

lvupBtns.clickUp.textContent = "+1 Click (Cost: 50)";
lvupBtns.clickUp.onclick = function () {
    if (clickPlus < 7) {
        if (clickCounter >= 50) {
            clickCounter -= 50;
            clickPlus += 1;
            lvupBtns.clickUp.textContent = "+1 Click (Cost: 50)";
            updateCounter();
        } else {
            alert("You need at least 50 clicks!");
        }
    } else if (clickPlus >= 7 && clickPlus < 20) {
        lvupBtns.clickUp.textContent = "+3 Click (Cost: 100)";
        if (clickCounter >= 100) {
            clickCounter -= 100;
            clickPlus += 3;
            lvupBtns.clickUp.textContent = "+3 Click (Cost: 100)";
            updateCounter();
        } else {
            alert("You need at least 100 clicks!");
        }
    } else {
        alert("You've reached maximum thinking power!! 🧠⚡");
    }
};


updateImg("twemoji");
updateCounter();

imgEle.onclick = function() {
    // 数値増加
    clickCounter += clickPlus;
    if (clickCounter >= 100 && clickCounter <= 500) {
        updateImg("noto");
    }
    if (clickCounter >= 500 && clickCounter <= 2000) {
        updateImg("fluent")
    }
    if (clickCounter >= 2000) {
        updateImg("apple")
    }
    updateCounter();

    // --- ここから縮みアニメ処理 ---
    imgEle.classList.remove("emoji-clicked");
    void imgEle.offsetWidth; // ← アニメ強制再適用
    imgEle.classList.add("emoji-clicked");
};
async function save() {
    let saveData = {
        nowTimer: timer,
        clickCount: clickCounter,
        clickUpNow: clickPlus
    }
    console.log(saveData)
    localStorage.setItem("save_00",JSON.stringify(saveData))
    disableTextRewrite = true;
    document.querySelector(".timer").textContent = "Saved.";
    await sleep(3000);
    disableTextRewrite = false;
}

var saved = localStorage.getItem("save_00");
if (saved != null) {
    console.log(saved)
    let a = JSON.parse(saved);
    console.log(a)
    clickCounter = a.clickCount;
    clickPlus = a.clickUpNow;
    timer = a.nowTimer;
    previousCounter = clickCounter;
    updateCounter();
}

let startTime = performance.now() - (timer * 1000); // ← これ重要！

setInterval(function () {
    let now = performance.now();
    let elapsedSec = (now - startTime) / 1000;
    timer = elapsedSec;
    if (!disableTextRewrite) {
        document.querySelector(".timer").textContent =
        `${gameInfo.version} (build ${gameInfo.buildNumber}) | Timer: ${elapsedSec.toFixed(3)}s | Copyright K.Yuzen 2023-2025, All right reserved.`;
    }
}, 16);

setInterval(async function() {
    save();
},30000)
document.querySelector(".save").onclick = async function(){save();}
document.querySelector(".delete_save").onclick = function() {
    let YorN = confirm("この操作をすると、セーブデータが削除されますがよろしいですか？");
    if (YorN == true) {
        localStorage.removeItem("save_00")
    }
}
document.querySelector(".all_reset").onclick = function() {
    let YorN = confirm("このゲームのユーザーデータをすべて削除して、再読み込みします。\nよろしいですか？")
    if (YorN == true) {
        localStorage.removeItem("save_00")
        location.reload
    }
}
