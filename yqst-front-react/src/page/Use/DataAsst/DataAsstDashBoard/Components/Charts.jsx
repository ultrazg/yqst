import React, {PureComponent} from 'react';
import EChartsReact from "echarts-for-react";

class Charts extends PureComponent {
  render() {
    return (
      <div>
        <EChartsReact
          option={this.props.options}
          lazyUpdate={true}
          style={{
            width: '100%',
            height: this.props.height
          }}
          opts={{
            renderer: 'svg'
          }}
        />
      </div>
    );
  }
}

export default Charts;