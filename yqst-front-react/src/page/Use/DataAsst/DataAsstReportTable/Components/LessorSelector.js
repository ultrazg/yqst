/*
 * @Description  : 供应商选择器
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-26 12:18:42
 * @LastEditTime : 2021-05-28 12:33:59
 */
import React, { memo, useState, useRef, useCallback, useEffect } from "react";
import useDebounce from "../../use/useDebounce";
import { Select } from "antd";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";

const { Option } = Select;

function LessorSelector({ value, onChange, placeholder, size }) {

    const [lessorlist, setLessorlist] = useState([]);
    const [keyword, setKeyword] = useState();
    const [isloading, setIsloading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const current = useRef(); // 当前page

    const requestLessorlist = useCallback(
        (isLoadMore = false) => {
            setIsloading(true);
            if (isLoadMore) {
                current.current = current.current + 1;
            } else {
                current.current = 1;
            }
            request(
                apiInterfaces.lessorlist,
                {
                    current: current.current,
                    pageSize: 10,
                    keyword: keyword,
                },
                (res) => {
                    if (isLoadMore) {
                        setLessorlist(lessorlist.concat(res.data.records));
                    } else {
                        setLessorlist(res.data.records);
                    }
                    if (res.data.total <= current.current * 10) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                    setIsloading(false);
                },
                (err) => {
                    setIsloading(false);
                },
                false
            );
        },
        [lessorlist, keyword]
    );

    const deboucedRequest = useDebounce(requestLessorlist, 500);

    const _onPopupScroll = useCallback((e) => {
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && hasMore) {
            // 加载下一页
            requestLessorlist(true);
        }
    }, [hasMore, requestLessorlist]);

    const _onDropdownVisibleChange = useCallback((open) => {
        if (open) {
            setKeyword("");
        }
    }, []);

    const _onSearch = useCallback((value) => {
        setKeyword(value);
    }, []);

    useEffect(
        () => {
            deboucedRequest();
        },
        [deboucedRequest, keyword]
    );

    return (
        <Select
            placeholder={placeholder}
            labelInValue
            loading={isloading}
            onPopupScroll={_onPopupScroll}
            onChange={onChange}
            filterOption={false} // 避免只有在字符串完全匹配时才显示
            size={size}
            onDropdownVisibleChange={_onDropdownVisibleChange}
            onSearch={_onSearch}
            listHeight={150}
            mode="multiple"
        >
            {
                lessorlist && lessorlist.map(
                    (item) => {
                        return (
                            <Option value={item.lessorSn} key={item.lessorSn}>
                                {item.lessorName}
                            </Option>
                        );
                    }
                )
            }
        </Select>
    );
}

LessorSelector.defaultProps = {
    placeholder: "请选择",
    size: "large",
};

export default memo(LessorSelector);
