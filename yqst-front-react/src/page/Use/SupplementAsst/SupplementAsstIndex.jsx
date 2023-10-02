import React, {Component} from 'react';
import ViewCoat from "../PublicModule/ViewCoat/ViewCoat";
import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";

class SupplementAsstIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "补单助手"},
                        {title: "概况"},
                    ]}
                >
                </ViewCoat>
            </>
        );
    }
}

export default SupplementAsstIndex;