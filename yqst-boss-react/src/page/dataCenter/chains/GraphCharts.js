import React from 'react'
import ReactECharts from "echarts-for-react";
import {Modal, Empty} from "antd";
import {FullscreenOutlined, FullscreenExitOutlined} from "@ant-design/icons";
import './GraphCharts.css';

export default class GraphCharts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      data: {
        startTime: '',
        endTime: '',
        api: '',
        tips: ''
      },
      isModalVisible: false
    }
  }

  setOptions = (options, callback) => {
    this.setState({options}, () => {
      callback && callback();
    })
  }

  setData = (data, callback) => {
    this.setState({
      data: {
        ...this.state.data,
        ...data,
      }
    }, () => {
      callback && callback();
    })
  }

  renderEchartsDom = () => {
    return (
      <ReactECharts
        className='echarts-layout'
        option={this.state.options}
        notMerge={true}
        style={{height: '450px'}}
        lazyUpdate={true}
        opts={{renderer: 'svg'}}
        // onEvents={{
        //     'click': e => {
        //         // todo
        //         const {id, name} = e.data;
        //         console.log(id, name);
        //     }
        // }}
      />
    )
  }

  renderTipsDom = () => (
    <p className="mtitle">
      操作提示：鼠标按住拖动，鼠标滚轮缩放，鼠标点击查看信息。
      <div>
        {
          this.state.data.tips[0] === '企业'
            ? <span><line-icon style={{background: "#ff4757"}}/>出租关系</span>
            : null
        }
        <span><line-icon style={{background: "#a4b0be"}}/>承租关系</span>
        <span><mini-icon style={{background: "#5767C8"}}/>搜索{this.state.data.tips[0]}</span>
        <span><mini-icon style={{background: "#2ed573"}}/>关联企业</span>
        <span><mini-icon style={{background: "#a55eea"}}/>
          {this.state.data.tips[1]}</span>
      </div>
    </p>
  )

  componentDidMount() {
  }

  render() {
    const {options} = this.state;
    // console.log('options：', options);

    if (Object.keys(options).length === 0) {
      return (
        <div
          style={{padding: '50px 0'}}
          className='right-layout'
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'选择一个项目来查看供应链关系图'}
          />
        </div>
      );
    }

    return <div className="right-layout">
      <h2>供应链关系图
        <div
          onClick={() => {
            this.setState({
              isModalVisible: true
            })
          }}
        ><FullscreenOutlined/>全屏查看</div>
      </h2>
      {this.renderTipsDom()}
      {this.renderEchartsDom()}
      <Modal
        title='全屏查看'
        visible={this.state.isModalVisible}
        footer={null}
        className='myModal'
        closeIcon={<FullscreenExitOutlined/>}
        destroyOnClose={true}
        onCancel={() => {
          this.setState({
            isModalVisible: false
          })
        }}
      >
        <div className="charts">
          {this.renderTipsDom()}
          {this.renderEchartsDom()}
        </div>
      </Modal>
    </div>
  }
}
