import React, {Component} from 'react';
import {rent_price, rent_supplies} from '../../../../resource';

export default class RentAssistantSituation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			businessList: [
				{
					logo: rent_supplies,
					text: '租赁物资库',
					url: '/pages/appCenter/rentAssistant/rentAssistantHome/rentalWarehouse'
				},
				{
					logo: rent_price,
					text: '租赁价格政策',
					url: '/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyList'
				}
			]
		};
	}

	render() {
		const {businessList} = this.state;
		return (
			<>
				<div style={{
					width: '100%',
					height: '119px',
					borderRadius: 6,
					backgroundColor: '#fff',
					boxSizing: 'border-box',
					padding: '22px 32px',
					color: '#2B3441'
				}}>
					<p style={{fontSize: 15}}>出租助手</p>
					<p style={{marginTop: 18, fontSize: 24}}>出租助手</p>
				</div>

				<div style={{
					width: '100%',
					height: '650px',
					backgroundColor: '#fff',
					marginTop: 25,
					borderRadius: 6
				}}>
					<div style={{
						boxSizing: "border-box",
						height: 50,
						borderBottom: '1px solid rgba(43, 52, 65, 0.25)',
						paddingLeft: 24,
						lineHeight: '50px',
						fontSize: 16,
						color: '#2B3441'
					}}>业务处理</div>

					<div style={{
						display: 'flex',
						boxSizing: "border-box",
						padding: 24
					}}>
						{
							businessList && businessList.map((item, index)=>(
								<div style={{
									width: 166,
									height: 60,
									display: "flex",
									justifyContent: 'space-around',
									alignItems: 'center',
									border: '1px solid rgba(43, 52, 65, 0.1)',
									borderRadius: 6,
									cursor: "pointer",
									marginLeft: index > 0 ? 36 : 0
								}} key={item.url} onClick={()=>{
									this.props.history.push(item.url)
								}}>
									<img src={item.logo} style={{width: 32, height: 32}} alt=''/>
									<span style={{color: '#2B3441', fontSize: 14}}>{item.text}</span>
								</div>
							))
						}
					</div>
				</div>
			</>
		)
	}
}
