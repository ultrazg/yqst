/**
 * Created by ljy on 2018/7/26
 */
import React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

const HeadBar = ({data}) => {
    if (!data) {
        return null;
    }
    let headBar = [];
    for (let i = 0; i < data.length; i++) {
        let text = null;
        if (data[i].onClick) {
            text = <a onClick={() => {
                data[i].onClick();
            }}><span style={{fontSize: 13.5}}>{data[i].name}</span></a>;
        } else if (data[i].link) {
            text = <Link to={data[i].link}><span style={{fontSize: 13.5}}>{data[i].name}</span></Link>;
        } else {
            text = <span style={{fontSize: 13.5}}>{data[i].name}</span>
        }
        headBar.push(
            <Breadcrumb.Item key={i}>{text}</Breadcrumb.Item>
        );
    }
    return <div style={{padding: 14}}>
        <Breadcrumb>
            {headBar}
        </Breadcrumb>
    </div>;
}
export default HeadBar;
