// @ts-ignore
import React from 'react';

export declare type ModeType = 'singlePage' | 'multiPage';

// pdf pdf地址或者文件
// ModeType 单页模式 和 多页模式
/**
 * 盖章问题需要到指定目录注释指定代码
 * /node_modules/pdfjs-dist/build/pdf.worker.js
 * /node_modules/pdfjs-dist/lib/core/annotation.js
 * 注释以下代码片段
    if (data.fieldType === 'Sig') {
        data.fieldValue = null;
        _this2.setFlags(_util.AnnotationFlag.HIDDEN);
    }
 */


export interface RenderPDFProps {
    url: string,
    mode?: ModeType,
    errorTitle?: string | React.ReactNode
}

export default class RenderPDF extends React.Component<RenderPDFProps, any> {
}
