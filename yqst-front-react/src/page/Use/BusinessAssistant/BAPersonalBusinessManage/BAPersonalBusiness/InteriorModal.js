import React, {Component} from 'react';
import {
    Modal,
    Input,
    Button,
    Checkbox,
    message,
    Empty
} from 'antd'
import Model from '../Model';
import {perCenter} from '../../../../../resource/index';

const { Search } = Input;

class InteriorModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount(){
        this.businessClueShareList();
    }

    render(){
        const {list} = this.state;
        const {onOk, onCancel} = this.props;
        const changeNum = (list = []) => {
            let num = 0;
            list.forEach(item => {
                if(item.isChecked)
                    ++num;
            });

            return num
        };

        return <Modal
            title={`请选择企业内部员工（${changeNum(this.state.list)} / ${this.state.list.length}）`}
            visible={true}
            width={700}
            onOk={() => {
                // onOk && onOk();
            }}
            onCancel={() => {
                onCancel && onCancel();
            }}
            footer={<div>
                <Button
                    type="primary"
                    style={{
                        width: '80px',
                        height: '40px',
                        // lineHeight: '40px',
                        fontSize: '16px',
                        marginRight: '16px',
                    }}
                    onClick={() => {
                        const changeShareUid = [];
                        this.state.list.forEach(item => {
                            if(item.isChecked)
                                changeShareUid.push(item.shareUid);
                        });
                        if(changeShareUid.length <= 0)
                            return message.error('请选择共享的对象！', 1);

                        onOk && onOk(changeShareUid.join(','));
                    }}
                >确定</Button>
                <Button
                    style={{
                        width: '80px',
                        height: '40px',
                        // lineHeight: '40px',
                        fontSize: '16px',
                    }}
                    onClick={() => {onCancel && onCancel();}}
                >取消</Button>
            </div>}
        >
            {
                list.length > 0 ? [
                    <Search
                        key={'Search_1'}
                        className={'shareSearch'}
                        maxLength={30}
                        placeholder="请输入"
                        onSearch={value => {
                            const newList = list.map(item => {
                                return {
                                    ...item,
                                    isHidden: item.shareName.indexOf(value) >= 0 ? false : true
                                }
                            });
                            this.setState({list: newList});
                        }}
                        style={{
                            height: '40px',
                            lineHeight: '40px',
                            marginBottom: '24px'
                        }}
                        onChange={(e) => {
                            const newList = list.map(item => {
                                return {
                                    ...item,
                                    isHidden: item.shareName.indexOf(e.target.value) >= 0 ? false : true
                                }
                            });
                            this.setState({list: newList});
                        }}
                    />,
                    <div
                        key={'div_1'}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            maxHeight: '250px',
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}
                    >
                        {
                            list.map((item, idx) => {
                                if(item.isHidden)
                                    return null;
                                return <div key={item.shareUid + ''}
                                            className={item.isChecked ? 'InteriorModal_List InteriorModal_onList' : 'InteriorModal_List'}
                                            title={item.shareName || ''}
                                            style={{
                                                width: '48%',
                                                paddingLeft: '8px',
                                                paddingRight: '8px',
                                                padding: '20px',
                                                border: '1px solid rgba(43,52,65,0.25)',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                marginBottom: '16px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                            onClick={() => {
                                                this.state.list[idx].isChecked = !this.state.list[idx].isChecked;
                                                this.setState({list: this.state.list});
                                            }}
                                >
                                    <Checkbox checked={item.isChecked}/>
                                    <img src={perCenter} alt="" style={{width: '24px', height: '24px', margin: '0px 8px'}}/>
                                    {item.shareName || ''}
                                </div>
                            })
                        }
                    </div>
                ] : <Empty/>
            }
        </Modal>
    }

    businessClueShareList(){
        Model.businessClueShareList({}, (res) => {
            const list = res.data && res.data.map(item => {
                return {
                    ...item,
                    isChecked: false,
                    isHidden: false,
                }
            });
            this.setState({list});
        }, (err) => {});
    }
}

export default InteriorModal;