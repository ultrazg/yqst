/*
 * @Description  : 防抖函数
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-24 16:39:09
 * @LastEditTime : 2021-05-24 16:44:35
 */

import { useRef, useCallback, useEffect } from "react";

export default function useDebounce(fn: Function, delay: number) {
    const debounce = useRef({ fn, timer: null });
    useEffect(function () {
        debounce.current.fn = fn;
    }, [fn]);

    return useCallback(function (...args: any[]) {
        if (debounce.current.timer) {
            clearTimeout(debounce.current.timer);
        }
        debounce.current.timer = setTimeout(() => {
            debounce.current.fn.call(debounce.current.fn, ...args);
        }, delay);
    }, [delay]);
}