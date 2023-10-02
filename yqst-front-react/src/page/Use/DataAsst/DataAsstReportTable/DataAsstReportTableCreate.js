import {Tabs, Radio} from "antd";
import React, {useState} from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import styles from "../DataAsst.module.css";
import DataAsstLesseeForm from "./Components/DataAsstLesseeForm";
import DataAsstLessorForm from "./Components/DataAsstLessorForm";
import DataAsstLesseeGoodsDetailForm from "./Components/DataAsstLesseeGoodsDetailForm";
import DataAsstLessorGoodsDetailForm from "./Components/DataAsstLessorGoodsDetailForm";
import DataAsstLesseeStandingbookForm from "./Components/DataAsstLesseeStandingbookForm";
import DataAsstLessorStandingbookForm from "./Components/DataAsstLessorStandingbookForm";
import DataAsstLesseeExpressForm from "./Components/DataAsstLesseeExpressForm";
import DataAsstLessorExpressForm from "./Components/DataAsstLessorExpressForm";
import DataAsstLesseeAdditionForm from "./Components/DataAsstLesseeAdditionForm";
import DataAsstLessorAdditionForm from "./Components/DataAsstLessorAdditionForm";

const {TabPane} = Tabs;

export default function DataAsstReportTableCreate({history}) {

    const [type, setType] = useState("");
    const _onSubmitSuccess = () => {
        history.push('/pages/appCenter/dataAsst/home/dataAsstReportTableIndex');
    };

    return (
        <ViewCoat
            breadCrumb={[
                {title: "数据助手"},
                {title: "生成报表"},
            ]}
        >
            <h2 className={styles.smalltitle}>生成物资统计表</h2>
            <div style={{marginLeft: 24, marginBottom: 24}}>
                <div>数据类型</div>
                <br/>
                <Radio.Group value={type} onChange={(e) => {
                    setType(e.target.value)
                }}>
                    <Radio.Button value="leaseGoods">承租物资统计表</Radio.Button>
                    <Radio.Button value="rentGoods">出租物资统计表</Radio.Button>
                    <Radio.Button value="project">项目台账报表</Radio.Button>
                    <Radio.Button value="supplier">供应商台账报表</Radio.Button>
                    <Radio.Button value="leaseGoodsDetail">承租物资明细表</Radio.Button>
                    <Radio.Button value="rentGoodsDetail">出租物资明细表</Radio.Button>
                    <Radio.Button value="leaseExpress">承租物流费用</Radio.Button>
                    <Radio.Button value="rentExpress">出租物流费用</Radio.Button>
                    <Radio.Button value="leaseAddition">承租附加费用</Radio.Button>
                    <Radio.Button value="rentAddition">出租附加费用</Radio.Button>
                </Radio.Group>
            </div>
            {(() => {
                switch (type) {
                    case 'leaseGoods':
                        return <DataAsstLesseeForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'project':
                        return <DataAsstLesseeStandingbookForm type={type} onSubmitSuccess={_onSubmitSuccess}/>;
                    case 'leaseGoodsDetail':
                        return <DataAsstLesseeGoodsDetailForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'rentGoods':
                        return <DataAsstLessorForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'supplier':
                        return <DataAsstLessorStandingbookForm type={type} onSubmitSuccess={_onSubmitSuccess}/>;
                    case 'rentGoodsDetail':
                        return <DataAsstLessorGoodsDetailForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'leaseExpress':
                        return <DataAsstLesseeExpressForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'rentExpress':
                        return <DataAsstLessorExpressForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'leaseAddition':
                        return <DataAsstLesseeAdditionForm type={type} onSubmitSuccess={_onSubmitSuccess}/>
                    case 'rentAddition':
                        return <DataAsstLessorAdditionForm type={type} onSubmitSuccess={_onSubmitSuccess}/>

                    default:
                        return null;
                }
            })()}
            {/*<Tabs defaultActiveKey="1" centered>*/}
            {/*    <TabPane tab="承租" key="1">*/}
            {/*        */}
            {/*    </TabPane>*/}
            {/*    <TabPane tab="出租" key="2">*/}
            {/*        */}
            {/*    </TabPane>*/}
            {/*</Tabs>*/}
        </ViewCoat>
    );
}
