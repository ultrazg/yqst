/*
 * @Description  : 
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-11 11:08:28
 * @LastEditTime : 2021-05-12 09:43:34
 */
import React from "react";
import { Button, Modal } from "antd";
import PDFViewer from "SWViews/renderPDF";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import print from "print-js";

function PdfModalViewer({ url, visible, onCancel }) {

    const printPDFFile = (url) => {
        print({
            printable: url,
            showModal: true,
            modalMessage: "正在处理，请稍等..."
        });
    };

    return (
        <Modal
            title="查看PDF"
            visible={visible}
            style={{
                top: 10,
            }}
            // 应比PDFViewer的宽度大
            width={820}
            bodyStyle={{
                height: "650px",
                overflow: "hide",
                padding: 0,
            }}
            onCancel={onCancel}
            footer={
                <div>
                    <Button
                        onClick={onCancel}
                    >取消</Button>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={
                            () => {
                                let downloadElement = document.createElement("a");
                                downloadElement.href = url;
                                downloadElement.download = "";
                                document.body.appendChild(downloadElement);
                                downloadElement.click();
                                document.body.removeChild(downloadElement);
                            }
                        }
                    >下载</Button>
                    <Button
                        style={{ backgroundColor: "#52c41a", color: "#fff" }}
                        icon={<PrinterOutlined />}
                        onClick={() => printPDFFile(url)}
                    >打印</Button>
                </div>
            }
        >
            <PDFViewer url={url} width={800} height={650}  />
        </Modal>
    );
}

PdfModalViewer.defaultProps = {
    visible: false,
};

export default PdfModalViewer;
