var imgPrefix = "twemoji";
var imgType = "thinking-face";
var clickCounter = 0;
var clickPlus = 1;
var timer = 0.000
var nextClick = 100

let disableTextRewrite = false
let imgEle = document.querySelector(".emoji");
let countText = document.querySelector(".clickCount");
let skinsMenu = document.querySelector(".skins");
let gameInfo = {
    version: "v1.8.1",
    buildNumber: "20250720-181"
}
let skinState = {
    default: {
        unlocked:true
    },
    ky: {
        unlocked:false
    }
}
let lvupBtns = {
    clickUp: document.querySelector(".upClick")
}
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒
let previousCounter = 0;

function updateImg(type,prefix) {
    imgType = type;
    imgPrefix = prefix;
    imgEle.src = `./${imgType}_${imgPrefix}.png`;
    console.log(`Image prefix and type is updated to ${imgType}, ${imgPrefix}.`);
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
    } else {
        if (clickPlus >= 7 && clickPlus < 20) {
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
            if (clickPlus >= 20 && clickPlus < 50) {
                lvupBtns.clickUp.textContent = "+7 Click (Cost: 200)";
                    if (clickCounter >= 200) {
                        clickCounter -= 200;
                        clickPlus += 7;
                        lvupBtns.clickUp.textContent = "+7 Click (Cost: 200)";
                        updateCounter();
                    } else {
                        alert("You need at least 200 clicks!");
                    }
            } else {
                alert("You've reached maximum thinking power!! 🧠⚡");
            }
        }
    } 
};


updateImg("thinking-face","twemoji");
updateCounter();

imgEle.onclick = async function() {
    updateSkinUIState();
    nowSkin = skinsMenu.value;
    // 数値増加
    clickCounter += clickPlus;
    if (clickCounter >= 100 && clickCounter <= 500 && nowSkin == "think_face") {
        nextClick = 500;
        updateImg("thinking-face","noto");
    }
    if (clickCounter >= 500 && clickCounter <= 2000 && nowSkin == "think_face") {
        nextClick = 2000;
        updateImg("thinking-face","fluent")
    }
    if (clickCounter >= 2000 && nowSkin == "think_face") {
        nextClick = 5000;
        updateImg("thinking-face","apple")
    }
    if (clickCounter == 5000 && nowSkin == "think_face") {
        nextClick = 1e+1
        skinState.ky.unlocked = true;
        alert('Skin "KY" is now UNLOCKED!!!')
        updateSkinUIState()
    }
    if (nowSkin == "ky_by_tg") {
        updateImg("ky","normal_click")
        await sleep(500)
        updateImg("ky","normal")
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
        clickUpNow: clickPlus,
        nowSkin: skinsMenu.value
    }
    console.log(saveData)
    try {
        localStorage.setItem("save_00",JSON.stringify(saveData))
    } catch(e) {
        disableTextRewrite = true;
        document.querySelector(".timer").textContent = "Failed to save. Please grant access to site data."
        document.querySelector(".timer").style.color = "red"
        await sleep(3000)
        disableTextRewrite = false;
        document.querySelector(".timer").style.color = "";
        return "error"
    }
    disableTextRewrite = true;
    document.querySelector(".timer").textContent = "Saved.";
    await sleep(1000);
    document.querySelector(".timer").textContent = "Checking save...";
    await sleep(1500)
    if (localStorage.getItem("save_00") == null) {
        document.querySelector(".timer").textContent = "Failed to save. Please report to developer.";
        document.querySelector(".timer").style.color = "red";
        await sleep(3000)
    } else {
        document.querySelector(".timer").textContent = "Successed to Save!";
        document.querySelector(".timer").style.color = "green";
        await sleep(3000)
    }
    document.querySelector(".timer").style.color = "";
    disableTextRewrite = false;
}

let startTime = performance.now() - (timer * 1000); // ← これ重要！
setInterval(function () {
    let now = performance.now();
    let elapsedSec = (now - startTime) / 1000;
    timer = elapsedSec;
    if (!disableTextRewrite) {
        document.querySelector(".timer").textContent =
        `Timer: ${elapsedSec.toFixed(3)}s | Clicks: ${clickCounter} | Click Multipier: ${clickPlus} | Next level: ${nextClick - clickCounter}`;
    }
    document.querySelector(".info").textContent =
    `${gameInfo.version} (build ${gameInfo.buildNumber}) | Copyright K.Yuzen 2023-2025, All right reserved.`;
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
        location.reload()
    }
}
function updateSkinUIState() {
    if (!skinState.ky.unlocked) {
        skinsMenu.options[1].innerText = "KY (by TYOKOGITUNE) [LOCKED: 5000 CLICKS]"
    } else {
        skinsMenu.options[1].innerText = "KY (by TYOKOGITUNE)"
    }
}
skinsMenu.onchange = function(){
    updateSkinUIState();
    console.log(this.value)
    if (clickCounter >= 5000) {
        skinState.ky.unlocked = true;
    }
    if (!skinState.ky.unlocked && this.value == "ky_by_tg") {
        alert("This skin is not unlocked!");
        this.value = "think_face";
    } else {
        updateImg("ky","normal")
    }
    if (this.value == "think_face") {
        updateImg("thinking-face","twemoji")
    }
}

var saved = localStorage.getItem("save_00");
if (saved != null) {
    console.log(saved)
    let a = JSON.parse(saved);
    console.log(a)
    clickCounter = a.clickCount;
    clickPlus = a.clickUpNow;
    timer = a.nowTimer;
    skinsMenu.value = a.nowSkin;
    previousCounter = clickCounter;
    skinsMenu.onchange();
    updateCounter();
}
window.onerror = function(event) {
    alert("ゲームのスクリプト内でエラーが発生しました。\nもし報告する場合、開発者へ次の画面で表示されるエラーログを送信してください。")
    alert(`Error date: ${new Date()}
    User agent: ${navigator.userAgent}
    Error:
    `,event)
    let ifReload = confirm("ゲームを一度セーブして、リロードしますか？\n(リロードすることを推奨します。)")
    if (ifReload) {
            let saveData = {
                nowTimer: timer,
                clickCount: clickCounter,
                clickUpNow: clickPlus,
                nowSkin: skinsMenu.value
            }
            console.log(saveData)
            try {
                localStorage.setItem("save_00",JSON.stringify(saveData))
                alert("セーブしました。\nゲームをリロードします。")
            } catch(e) {
                alert("セーブに失敗しました。\nゲームをリロードします。")
            }
        location.reload()
    }
}
