/**
 * Created by ljy on 2018/5/7
 */

let priority = {
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1
}
let strExpression2arrExpression = (expression) => {//字符串转换为数组
    var arr = [];
    for (var i = 0, s, t, l = expression.length; i < l; i++) {
        s = expression.charAt(i);
        if (isNaN(s) && s != '.') {
            arr.push(s);
        } else {
            t = s;
            while (i < l) {
                s = expression.charAt(i + 1);
                if (!isNaN(s) || s == '.') {
                    t += s;
                    i++;
                } else {
                    break;
                }
            }
            arr.push(parseFloat(t));
        }
    }
    return arr;
}
let infixExpression2prefixExpression = (arrExpression) => { //将中缀表达式转换为前缀表达式
    var s1 = [], s2 = [], operator = function (o) {
        var last = s1[s1.length - 1];
        if (s1.length == 0 || last == ')') {
            s1.push(o);
        } else if (priority[o] >= priority[last]) {
            s1.push(o);
        } else {
            s2.push(s1.pop());
            operator(o);
        }
    };
    return (() => {
        s1.length = 0;
        s2.length = 0;
        for (var i = arrExpression.length - 1, o; i >= 0; i--) {
            o = arrExpression[i]
            if (!isNaN(o)) {
                s2.push(o);
            } else {
                if (o == '+' || o == '-' || o == '*' || o == '/') {//运算符
                    operator(o)
                } else {//括号
                    if (o == ')') {//右括号
                        s1.push(o)
                    } else {//左括号
                        var s = s1.pop();
                        while (s != ')') {
                            s2.push(s);
                            s = s1.pop();
                        }
                    }
                }
            }
        }
        if (s1.length > 0) {
            while (s1[0] != undefined) {
                s2.push(s1.pop())
            }
        }
        s1.length = 0;
        return s2.slice();
    })();
}
let computePrefixExpression = (prefixExpression) => {
    var s1 = [], result;
    return (() => {
        s1.length = 0;
        //计算
        while (prefixExpression.length > 0) {
            var o = prefixExpression.shift();
            if (!isNaN(o)) {
                s1.push(o);
            } else {
                switch (o) {
                    case '+': {
                        result = s1.pop() + s1.pop();
                        break;
                    }
                    case '-': {
                        result = s1.pop() - s1.pop();
                        break;
                    }
                    case '*': {
                        result = s1.pop() * s1.pop();
                        break;
                    }
                    case '/': {
                        result = s1.pop() / s1.pop();
                        break;
                    }
                }
                s1.push(result);
            }
            //console.log(s2,s1)
        }
        //console.log(s1)
        return s1[0];
    })();
};
let compute = (expression) => {
    //console.log(strExpression2arrExpression(expression))
    //console.log(infixExpression2prefixExpression(strExpression2arrExpression(expression)).reverse())
    return computePrefixExpression(infixExpression2prefixExpression(strExpression2arrExpression(expression)));
}
export default {compute};