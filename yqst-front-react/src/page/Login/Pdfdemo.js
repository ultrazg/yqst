import React from 'react';
import PdfSealViewLayout from '../../baseview/pdfSealView/PdfSealViewLayout'

export default class Pdfdemo extends React.Component {
    render() {
        return <div>
            <PdfSealViewLayout
                url={window.getOrginUrl('https://sunawtest.oss-cn-shenzhen.aliyuncs.com/jiuerliu/demo/CT20061616283506BS9IX.pdf')}
                url={window.getOrginUrl('http://www.pdf995.com/samples/pdf.pdf')}
            />
        </div>
    }
}
