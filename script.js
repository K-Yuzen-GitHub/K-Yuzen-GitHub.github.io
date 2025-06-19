let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let hoverLabel = document.querySelector(".hover_contents")


function qs(v1) {
    return document.querySelector(v1);
}

function setHover(selector, text, url) {
    let el = qs(selector);
    el.onmouseover = function() {
        hoverLabel.innerText = text;
    }
    el.onmouseout = function() {
        hoverLabel.innerText = "";
    }
    el.onclick = function() {
        window.open(url);
    }
}

setHover(".github", "My GitHub account", "https://github.com/k-yuzen-github");
setHover(".misskey", "KYMisskey Server", "https://ky-misskey.xyz");
setHover(".twitter", "My Twitter account", "https://twitter.com/K_Yuzen_67854");
setHover(".uwuzu_net", "My uwuzu.net account", "https://uwuzu.net/@k_yuzen");
setHover(".youtube", "My YouTube channel", "https://www.youtube.com/@kyuzen01-ky");

qs(".github").onclick = function() {
    window.open("https://github.com/k-yuzen-github");
}
qs(".misskey").onclick = function() {
    window.open("https://ky-misskey.xyz");
}
qs(".twitter").onclick = function() {
    window.open("https://twitter.com/K_Yuzen_67854");
}
qs(".uwuzu_net").onclick = function() {
    window.open("https://uwuzu.net/@k_yuzen");
}
qs(".youtube").onclick = function() {
    window.open("https://www.youtube.com/@kyuzen01-ky");
}
if (!isDarkMode) {
    qs(".g-ico").src = "./icons/github-dark.svg";
} else {
    qs(".g-ico").src = "./icons/github-light.svg";
}

setInterval(function() {
    let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!isDarkMode) {
        qs(".g-ico").src = "./icons/github-dark.svg";
    } else {
        qs(".g-ico").src = "./icons/github-light.svg";
    }
},1000) // 一応1秒ごとにテーマ検知してるけど意味は多分ない

console.log("Web page version: 1");