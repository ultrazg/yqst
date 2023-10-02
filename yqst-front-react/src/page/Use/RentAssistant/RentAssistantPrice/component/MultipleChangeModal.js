import React, {useState} from 'react';
import {Button, Input, Modal} from 'antd';

function MultipleChangeModal({closeModal, showModal}){
	const [unitPrice, setUnitPrice] = useState('');
	const [discount, setDiscount] = useState('');

	return(
		<Modal
			className={'Modal'}
			width={918}
			visible={showModal}
			title={'批量修改物资信息'}
			footer={null}
			onCancel={()=>{
				closeModal(null);
			}}
		>
			<div style={{display: 'flex', fontSize: 14, color: 'rgba(43, 52, 65, 1)', alignItems: 'center', marginTop: 15}}>
				<div style={{width: 180, textAlign: 'right', paddingRight: 10}}>租赁单价/元(含税)：</div>
				<Input
					style={{width: 180}}
					value={unitPrice}
					onChange={(e)=>{
						setUnitPrice(e.target.value)
					}}
				/>
			</div>
			<div style={{display: 'flex', fontSize: 14, color: 'rgba(43, 52, 65, 1)', alignItems: 'center', marginTop: 15}}>
				<div style={{width: 180, textAlign: 'right', paddingRight: 10}}>折扣(%)：</div>
				<Input
					style={{width: 180}}
					value={discount}
					onChange={(e)=>{
						setDiscount(e.target.value)
					}}
				/>
			</div>

			<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
				<Button
					type="primary"
					style={{width: 80, marginLeft: 15, borderRadius: 2}}
					onClick={()=>{
						closeModal(unitPrice, discount);
					}}
				>
					确定
				</Button>
				<Button
					style={{width: 80, marginLeft: 15, borderRadius: 2}}
					onClick={() => {
						closeModal(null)
					}}
				>
					取消
				</Button>
			</div>

		</Modal>
	)
}

export default MultipleChangeModal;
