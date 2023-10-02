/*
 * @Description  : 客户选择器
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-26 16:33:32
 * @LastEditTime : 2021-05-28 12:33:42
 */
import React, { memo, useState, useRef, useCallback, useEffect } from "react";
import useDebounce from "../../use/useDebounce";
import { Select, Input } from "antd";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

function LessorSelector({ value, onChange, placeholder, size }) {

    const [lesseelist, setLesseelist] = useState([]);
    const [keyword, setKeyword] = useState();
    const [isloading, setIsloading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const current = useRef(); // 当前page

    const requestLesseelist = useCallback(
        (isLoadMore = false) => {
            setIsloading(true);
            if (isLoadMore) {
                current.current = current.current + 1;
            } else {
                current.current = 1;
            }
            request(
                apiInterfaces.lesseelist,
                {
                    current: current.current,
                    pageSize: 10,
                    keyword: keyword,
                },
                (res) => {
                    if (isLoadMore) {
                        setLesseelist(lesseelist.concat(res.data.records));
                    } else {
                        setLesseelist(res.data.records);
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
        [lesseelist, keyword]
    );

    const deboucedRequest = useDebounce(requestLesseelist, 500);

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

    const _onPopupScroll = useCallback((e) => {
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && hasMore) {
            // 加载下一页
            requestLesseelist(true);
        }
    }, [hasMore, requestLesseelist]);

    return (
        <Select
            placeholder={placeholder}
            labelInValue
            loading={isloading}
            onPopupScroll={_onPopupScroll}
            filterOption={false} // 避免只有在字符串完全匹配时才显示
            onChange={onChange}
            size={size}
            onDropdownVisibleChange={_onDropdownVisibleChange}
            onSearch={_onSearch}
            listHeight={150}
            mode="multiple"
        >
            {
                lesseelist && lesseelist.map(
                    (item) => {
                        return (
                            <Option value={item.lesseeSn} key={item.lesseeSn}>
                                {item.lesseeName}
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
