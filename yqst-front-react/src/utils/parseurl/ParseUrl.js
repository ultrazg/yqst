/**
 * Created by ljy on 2018/2/2
 * 消息中心-跳转规则
 *
 测试代码：
 var Url = 'http://item.taobao.com//item.htm?a=1&b=2&c=&d=xxx&e#93939';
 console.log("scheme=", ParseUrl.parse(Url));
 let urlObj=ParseUrl.parse(Url);
 switch(urlObj.Host){
            case "appchannel":
                break;
            default :
                alert(urlObj.Url);
                break;
  }

 */

let ParseUrl = {
    parse(url) {
        let oriurl = new String(url).toString();
        oriurl = oriurl ? oriurl : "";
        try {
            if (url) {
                let Url = url.split("://");
                let Scheme = Url[0];
                let HostAndParams = Url[1].split("?");
                let pathIdx = HostAndParams[0].indexOf("/");
                return {
                    Url: oriurl,
                    Scheme: Scheme,
                    Host: HostAndParams[0].substring(0, pathIdx),
                    Path: HostAndParams[0].substring(pathIdx, HostAndParams[0].length),
                    Params: ParseUrl.parseQuery(HostAndParams[1])
                }
            }
            return {
                Url: oriurl,
                Scheme: '',
                Host: '',
                Path: '',
                Params: ''
            }
        } catch (e) {
            return {
                Url: oriurl,
                Scheme: '',
                Host: '',
                Path: '',
                Params: ''
            }
        }
    },
    parseQuery(str, separator) {
        let hash={};
        var rquery = /^(?:[^?]*\?)?([\w\d\-\/=&%]+)/;
        var query = String(str).match(rquery),
            key,
            value;

        if (query == null) return hash;

        query = query.pop();
        separator = separator || '&';

        return query.split(separator).reduce(function (hash, pair) {
            if (pair.indexOf('=') > 0) {
                pair = decodeURIComponent(pair).split('=');

                key = pair.shift();
                // 如果query中某个变量值包含等号
                // 我们应该重新组合起来
                value = pair.join('=');

                if (value != void 0) {
                    value = value.replace('+', ' ');
                }
            } else {
                key = decodeURIComponent(pair);
                value = void 0;
            }

            hash[key] = value;

            return hash;
        }, {});
    }
}
export default ParseUrl;