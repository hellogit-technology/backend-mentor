var str = document.getElementsByTagName("div")[0].innerHTML.toString(),
    i = 0;
(document.getElementsByTagName("div")[0].innerHTML = ""),
    setTimeout(function () {
        var e = setInterval(function () {
            i++, (document.getElementsByTagName("div")[0].innerHTML = str.slice(0, i) + "|"), i == str.length && (clearInterval(e), (document.getElementsByTagName("div")[0].innerHTML = str));
        }, 10);
    }, 0);
