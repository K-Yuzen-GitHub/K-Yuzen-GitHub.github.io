let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function qs(v1) {
    return document.querySelector(v1);
}
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