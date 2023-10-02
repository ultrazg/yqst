/**
 * Created by ljy on 2018/7/26
 */
import React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import PublicData from '../../base/publicData/PublicData';

const HeadBar = ({data}) => {
    if (!data) {
        return null;
    }
    let headBar = [];
    for (let i = 0; i < data.length; i++) {
        let text = data[i].link ?
            <Link to={data[i].link}><span style={{fontSize: 13.5}}>{data[i].name}</span></Link>
            : <span style={{fontSize: 13.5}}>{data[i].name}</span>;
        headBar.push(
            <Breadcrumb.Item key={i}>{text}</Breadcrumb.Item>
        );
    }
    return <div style={{
        padding: 14,
        height: PublicData.breadHeight
    }}>
        <Breadcrumb>
            {headBar}
        </Breadcrumb>
    </div>;
}
export default HeadBar;