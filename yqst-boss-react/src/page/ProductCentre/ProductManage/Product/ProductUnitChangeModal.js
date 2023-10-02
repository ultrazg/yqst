import React from 'react';
import {Input, InputNumber, List, Modal} from "antd";


export default class ProductUnitChangeModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeList: this.props.changeList || []
        }
    }


    render() {
        return <Modal
            title="设置单位换算公式"
            visible={true}
            bodyStyle={{
                overflow: "auto",
                maxHeight: 300
            }}
            destroyOnClose
            onOk={() => {
                this.props.onOk && this.props.onOk(this.state.changeList)
            }}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
        >
            <div>换算比例需大于0,支持小数点后4位</div>
            <List
                dataSource={this.state.changeList}
                renderItem={(item, index) => (
                    <List.Item>
                        <InputNumber
                            value={item.unitValue}
                            onChange={(e) => {
                                let changeList = this.state.changeList;
                                changeList[index].unitValue = e;
                                this.setState({
                                    changeList
                                })
                            }}
                            min={0}
                            max={999999.9999}
                            precision={4}
                        />
                        {" " + item.unit}
                        {" = "}
                        <InputNumber
                            value={item.convertUnitValue}
                            onChange={(e) => {
                                let changeList = this.state.changeList;
                                changeList[index].convertUnitValue = e;
                                this.setState({
                                    changeList
                                })
                            }}
                            min={0}
                            max={999999.9999}
                            precision={4}/>
                        {" " + item.convertUnit}
                    </List.Item>
                )}
            />
        </Modal>
    }
}
