import React, {Component} from 'react';
import classnames from 'classnames'
import deptIcon from '../../../resource/dept.png'
import {DownOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons';
import {Empty, Input, Pagination, Tree} from 'antd';
import IsPower from '../../Power/IsPower'
import '../index.less'


const deptIconDom = <img alt='' src={deptIcon} style={{width: 18, height: 18, marginTop: '-2px'}}/>;

class DeptTree extends Component {
    state = {
        deptSearchActive: undefined,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    resetState = () => {
        this.setState({deptSearchActive: undefined,})
    }

    renderTreeNodes = data => {
        const {field, isParentSelect = true} = this.props;
        return data && data.map(item => {
            if (item.children) {
                return (
                    <Tree.TreeNode
                        {...item}
                        icon={deptIconDom}
                        isLeaf={item.hasChildren !== true}
                        key={item[field.key] + ''}
                        title={item[field.label] || item[field.searchLabel]}
                        dataRef={item}
                        selectable={isParentSelect}
                    >
                        {this.renderTreeNodes(item.children)}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode
                    {...item}
                    icon={deptIconDom}
                    isLeaf={item.hasChildren !== true}
                    key={item[field.key] + ''}
                    title={item[field.label] || item[field.searchLabel]}
                    dataRef={item}
                />
            )
        });
    };

    render() {
        const {searchData} = this.props
        return (
            <div>
                {this.renderDeptTreeSearch()}
                {this.props.children}
                {
                    (searchData !== undefined && JSON.stringify(searchData) !== '{}') ? this.renderSearch() : this.renderDeptTree()
                }
            </div>
        );
    }

    renderSearch = () => {
        const {searchData} = this.props
        return (
            <div style={{padding: '12px 12px'}}>
                <h3>部门列表</h3>
                <ul className='dept-list sw-textOverflow text-elli1'>
                    {searchData && searchData.deptData.length === 0 && <p>无搜索结果</p>}
                    {searchData && searchData.deptData.map(n => (
                        <li key={n.deptId} className={classnames({
                            'dept-list-li-active': this.state.deptSearchActive === n.deptId
                        })} onClick={() => {
                            this.setState({deptSearchActive: n.deptId})
                            this.props.getDeptStaffFn(n.deptId, 2, 1)
                        }}>
                            {deptIconDom}
                            {n.depName}
                        </li>
                    ))}
                </ul>
                <h3>人员列表</h3>
                <ul className='dept-list sw-textOverflow'>
                    {searchData && searchData.staff
                    && searchData.staff.records
                    && searchData.staff.records.length === 0 && <p>无搜索结果</p>}
                    {searchData && searchData.staff
                    && searchData.staff.records
                    && searchData.staff.records.map(n => (
                        <li key={n.id} className='Tree sw-textOverflow text-elli1' onClick={() => {
                            this.props.showStaffDetail(n)
                        }}><UserOutlined style={{width: 18, fontSize: 18}}/>{n.name}</li>
                    ))}
                </ul>
                {
                    searchData && searchData.staff && searchData.staff.pages && searchData.staff.pages > 1 && (
                        <div style={{textAlign: 'center'}}>
                            <Pagination
                                simple
                                current={searchData.staff.current}
                                total={searchData.staff.total}
                                onChange={(page) => {
                                    this.props.enterpriseSearch(page)
                                }}
                                showSizeChanger={false}
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    renderDeptTreeSearch = () => {
        const {searchChange, searchValue, searchKeyDown, style, active} = this.props;
        const resHtml = [
            <div
                key={0}
                style={style && style.searchInputPadding ? style.searchInputPadding : {padding: '24px 0'}}
                className='header-search'
            >
                {
                    active === 0 ? (
                        <Input
                            placeholder={active === 0 ? '搜索员工名称 / 部门' : '搜索员工名称 / 职务'}
                            size='large'
                            onChange={searchChange}
                            value={searchValue}
                            prefix={<SearchOutlined style={{color: '#2B3441', fontSize: 13}}/>}
                            onKeyDown={searchKeyDown}
                        />
                    ) : (
                        <div style={{height: 40}}/>
                    )
                }
            </div>
        ];

        switch (active + '') {
            case '0':
                return <IsPower
                    key={'COLLEAGUE_DEPT_ENTER_00'}
                    permissionsName={'COLLEAGUE_DEPT_ENTER'}
                    isShowRes={false}
                    isShowWait={false}
                >
                    {resHtml}
                </IsPower>;
            case '1':
                return <IsPower
                    key={'COLLEAGUE_POST_ENTER_00'}
                    permissionsName={'COLLEAGUE_POST_ENTER'}
                    isShowRes={false}
                    isShowWait={false}
                >
                    {resHtml}
                </IsPower>;

            default:
                return resHtml;
        }
    };

    renderDeptTree = () => {
        const {
            treeData,
            treeLoadData,
            treeOnSelect,
            treeLoadedKeys,
            treeSelectKey,
            treeExpandedKeys,
            treeOnExpand,
            multiple = false,
            style,
            active
        } = this.props;
        const resHtml = [
            <div key={1} style={{...(style && style.treeMT)}} className='heh-tree'>
                {
                    (treeData && treeData.length === 0) && (
                        <Empty style={{marginTop: 100}}/>
                    )
                }
                <Tree.DirectoryTree
                    className='Tree sw-textOverflow'
                    multiple={multiple}
                    loadData={treeLoadData}
                    onSelect={treeOnSelect}
                    loadedKeys={treeLoadedKeys}
                    selectedKeys={treeSelectKey}
                    expandedKeys={treeExpandedKeys}
                    onExpand={treeOnExpand}
                    expandAction={false}
                    switcherIcon={
                        <DownOutlined style={{fontSize: 16, color: '#000000', fontWeight: 'bold'}}/>
                    }
                >
                    {this.renderTreeNodes(treeData)}
                </Tree.DirectoryTree>
            </div>
        ];

        switch (active + '') {
            case '0':
                return <IsPower
                    key={'COLLEAGUE_DEPT_ENTER_01'}
                    permissionsName={'COLLEAGUE_DEPT_ENTER'}
                    isShowRes={false}
                    isShowWait={false}
                >
                    {resHtml}
                </IsPower>;

            case '1':
                return <IsPower
                    key={'COLLEAGUE_POST_ENTER_01'}
                    permissionsName={'COLLEAGUE_POST_ENTER'}
                    isShowRes={false}
                    isShowWait={false}
                >
                    {resHtml}
                </IsPower>;

            default:
                return resHtml;
        }
    }
}

export default DeptTree;
