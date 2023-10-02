import React, {Component} from 'react';
import OperationRecordRouter from '../../PageRouters/ChildRouter/OperationRecordRouter';
const leftMenu = [
    {
        label: '操作记录',
        key: 'recordIndex',
        path: '/pages/myCompany/operationRecord/recordIndex',
    },
];

class OperationRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div
                className={'opeRecCss'}
                style={{
                    width: '1116px',
                    margin: '24px auto',
                    background: '#fff',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: '662px',
                    fontSize: '14px'
                }}
            >
                <div
                    style={{
                        width: '261px',
                        height: '100%',
                        background: '#F9FAFC',
                        borderRadius: '6px 0px 0px 6px',
                        position: 'absolute',
                        left: '0px'
                    }}
                >
                    {this.makeMenu()}
                </div>
                <div
                    className={'rightComtent'}
                    style={{
                        width: '100%',
                        paddingLeft: '261px',
                        borderRadius: '6px'
                    }}
                >
                    <OperationRecordRouter/>
                </div>
            </div>
        );
    }

    makeMenu(){
        const selectedKeys = this.props.history.location.pathname.split('/')[4] ? this.props.history.location.pathname.split('/')[4] : '';
        return <ul className={'leftMenu'}>
            {
                leftMenu.map((item, idx) => {
                    return <li
                        className={selectedKeys == item.key ? 'onLi' : ''}
                        key={item.key}
                        onClick={() => {
                            this.props.history.push(item.path);
                        }}
                    >
                        {item.label}
                    </li>
                })
            }
        </ul>
    }
}

export default OperationRecord;
