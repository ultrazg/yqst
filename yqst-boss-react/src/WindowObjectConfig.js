/**
 * Created by ljy on 2019-05-30
 */
let WindowObjectConfig = () => {
    //prod关闭log打印
    if (process.env.NODE_ENV === "production") {
        global.console = {
            ...global.console,
            error: () => {
            },
            info: () => {
            },
            log: () => {
            },
            warn: () => {
            },
            trace: () => {
            },
            debug: () => {
            },
            table: () => {
            },
            group: () => {
            },
            groupEnd: () => {
            },
            groupCollapsed: () => {
            },
            assert: () => {
            },
        };
    }
//post打开新tab的网页
    window.openPostWindow = {
        run: (url, data, target) => {
            var tempForm = document.createElement("form");
            tempForm.id = "tempForm1";
            tempForm.method = "post";
            tempForm.action = url;
            tempForm.target = target ? target : "_blank";
            for (var key in data) {
                let hideInput = document.createElement("index.js");
                hideInput.type = "hidden";
                hideInput.name = key
                hideInput.value = data[key];
                tempForm.appendChild(hideInput);
            }
            tempForm.onsubmit = function () {
                window.open('about:blank', null);
            };
            document.body.appendChild(tempForm);
//            tempForm.fireEvent("onsubmit");
            tempForm.submit();
            document.body.removeChild(tempForm);
        }
    }

    const GetRequest = (url) => {
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    window.isFirefox = navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("firefox") >= 0;
    //要批量压缩包下载
    window.downloadZip = (src) => {
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm2";
        tempForm.method = "get";
        tempForm.action = src;
        tempForm.target = "_blank";
        tempForm.onsubmit = function () {
            window.open('about:blank', null);
        };
        if (src.indexOf("?") > 0) {
            var paramsObj = GetRequest("?" + src.split("?")[1]);
            for (var key in paramsObj) {
                var hideInput = document.createElement("index.js");
                hideInput.type = "hidden";
                hideInput.name = key
                hideInput.value = (paramsObj[key]);
                tempForm.appendChild(hideInput);
            }
        }
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
    };
    window.downLoadHost = "";
    //单个文件下载
    window.download = (src, downLoadHost) => {
        if (window.isFirefox) {
            src = (window.downLoadHost ? window.downLoadHost + "?url=" : "") + src;
            var tempForm = document.createElement("form");
            tempForm.id = "tempForm3";
            tempForm.method = "get";
            tempForm.action = src;
            tempForm.target = "_blank";
            tempForm.onsubmit = function () {
                window.open('about:blank', null);
            };
            if (src.indexOf("?") > 0) {
                var paramsObj = GetRequest("?" + src.split("?")[1]);
                for (var key in paramsObj) {
                    var hideInput = document.createElement("index.js");
                    hideInput.type = "hidden";
                    hideInput.name = key
                    hideInput.value = (paramsObj[key]);
                    tempForm.appendChild(hideInput);
                }
            }
            document.body.appendChild(tempForm);
            tempForm.submit();
            document.body.removeChild(tempForm);
        } else {
            let a = document.createElement('a');
            a.setAttribute("href", (window.downLoadHost ? window.downLoadHost + "?url=" : "") + src);
            a.setAttribute("download", "");
            a.setAttribute('target', '_parent');
            let evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, true, true, true, true, 0, null);
            a.dispatchEvent(evObj);
        }
    };
    window.setScrollTop = (value) => {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
        let RightRouteDiv = document.getElementById("RightRouteDiv");
        if (RightRouteDiv)
            RightRouteDiv.scrollTop = value;
    };
}
export default WindowObjectConfig;
