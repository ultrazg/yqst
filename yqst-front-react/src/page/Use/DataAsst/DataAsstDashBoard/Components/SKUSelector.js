/*
 * @Description  : 物资分类选择器(待搜索)
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-24 14:37:29
 * @LastEditTime : 2021-06-01 11:52:29
 */
import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import useDebounce from "../../use/useDebounce";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";

const { Option } = Select;

function SKUSelector({ value = {}, onChange, placeholder }) {

    const [categorylist, setCategorylist] = useState([]);
    const [keyword, setKeyword] = useState();
    const [isloading, setIsloading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const current = useRef(); // 当前page

    const requestCategorylist = useCallback(
        (isLoadMore) => {
            setIsloading(true);
            if (isLoadMore) {
                current.current = current.current + 1;
            } else {
                current.current = 1;
            }
            request(
                apiInterfaces.SKUList,
                {
                    current: current.current,
                    pageSize: 10,
                    keyword: keyword,
                },
                (res) => {
                    if (isLoadMore) {
                        setCategorylist(categorylist.concat(res.data.records));
                    } else {
                        setCategorylist(res.data.records);
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
        [categorylist, keyword]
    );

    const deboucedRequest = useDebounce(requestCategorylist, 500);

    useEffect(() => {
        requestCategorylist(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _onKeywordChange = useCallback(
        (e) => {
            setKeyword(e.target.value);
            deboucedRequest(false);
        },
        [deboucedRequest]
    );

    const _dropdownRender = useCallback(
        (originNode) => {
            return (
                <>
                    <Input
                        placeholder="搜索关键词"
                        value={keyword}
                        suffix={<SearchOutlined />}
                        onChange={_onKeywordChange}
                        allowClear
                    />
                    {originNode}
                </>
            );
        },
        [keyword, _onKeywordChange]
    );

    const _onPopupScroll = useCallback((e) => {
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight && hasMore) {
            // 加载下一页
            requestCategorylist(true);
        }
    }, [hasMore, requestCategorylist]);


    return (
        <Select
            placeholder={placeholder}
            labelInValue
            loading={isloading}
            onPopupScroll={_onPopupScroll}
            dropdownRender={_dropdownRender}
            onChange={onChange}
            listHeight={150}
            optionLabelProp="label"
        >
            {
                categorylist && categorylist.map(
                    (item) => {
                        return (
                            <Option value={item.leaseGoodsSn} key={item.leaseGoodsSn} label={item.goodsName}>
                                <span style={{ verticalAlign: "center" }}>SKU编号：{item.leaseGoodsSn}</span>
                                <br />
                                <span style={{ verticalAlign: "center" }}>物资名称：{item.goodsName}</span>
                                <br />
                                <span style={{ verticalAlign: "center" }}>规格：{item.specList ? item.specList.map((it, idx) => {
                                    return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                                }).join("") : ""}</span>
                                <br />
                                <span style={{ verticalAlign: "center" }}>物资单位：{item.goodsUnit}</span>
                            </Option>
                        );
                    }
                )
            }
        </Select>
    );
}

SKUSelector.defaultProps = {
    placeholder: "请选择",
};

export default memo(SKUSelector);
