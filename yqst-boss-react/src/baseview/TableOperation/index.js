import React, {useEffect, cloneElement} from 'react';
import {Dropdown, Menu} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';

export default function (props) {
    const menu = (
        <Menu>
            {
                props.children.map((item, index) => {
                    const extendedAttributes = {
                        size: 'small',
                        type: 'primary'
                    };
                    return (
                        <Menu.Item style={{textAlign: 'center'}}>
                            {React.cloneElement(item, {...extendedAttributes, key: index})}
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    );
    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <EllipsisOutlined
                style={{fontSize: '30px', cursor: 'pointer'}}
            />
        </Dropdown>
    );
}
