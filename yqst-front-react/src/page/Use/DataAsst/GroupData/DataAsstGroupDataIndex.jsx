import React from 'react';
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";

/**
 * 数据助手 - 集团数据
 */
class DataAsstGroupDataIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "数据助手"},
                    {title: "集团数据"},
                ]}
            >
                <span>DataAsstGroupDataIndex</span>
            </ViewCoat>
        );
    }
}

export default DataAsstGroupDataIndex;