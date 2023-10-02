import {Redirect, Route, Switch} from 'react-router-dom'
import React from 'react'
import PAIndex from "./PAIndex";
import PaGeneralPage from "./PaGeneral/PaGeneralPage";
import PaContractTemplateList from "./PaContractTemplate/PaContractTemplateList";
import PaContractTemplateDetail from "./PaContractTemplate/PaContractTemplateDetail";
import PaContractTemplateTypeList from "./PaContractTemplate/PaContractTemplateTypeList";
import PaContractTemplateTypeDetail
	from "./PaContractTemplate/PaContractTemplateTypeDetail";


export default function () {
	return (
		<Switch>
			<Route path="/pages/appCenter/purchasingAssistant/paIndex" component={PAIndex}/>
			<Redirect from='/pages/appCenter/purchasingAssistant' to='/pages/appCenter/purchasingAssistant/paIndex'/>
		</Switch>
	)
}

export const PaMenuRouter = () => {
	return (
		<Switch>
			<Route path="/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateList"
			       component={PaContractTemplateList}/>
			<Route path="/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateDetail"
			       component={PaContractTemplateDetail}/>
			<Route path="/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateTypeList"
			       component={PaContractTemplateTypeList}/>
			<Route path="/pages/appCenter/purchasingAssistant/paIndex/PaContractTemplate/PaContractTemplateTypeDetail"
			       component={PaContractTemplateTypeDetail}/>
			<Route path="/pages/appCenter/purchasingAssistant/paIndex/PaGeneralPage"
			       component={PaGeneralPage}/>
			<Redirect from='/pages/appCenter/purchasingAssistant/paIndex'
			          to='/pages/appCenter/purchasingAssistant/paIndex/PaGeneralPage'/>
		</Switch>
	)
}
