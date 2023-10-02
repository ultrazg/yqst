import React from "react";


export default class SealView extends React.Component {
    sealWidth = 60;
    sealHeight = 60;

    render() {
        return this.props.dragObjArr.map((item, idx) => {
            if (item.page != this.props.page)
                return null;
            return <div
                id={`pdf-${this.props.domIndex}-page-${this.props.page}-seal${idx}`}
                style={{
                    width: this.sealWidth,
                    height: this.sealHeight,
                    backgroundColor: '#00f',
                    position: 'absolute',
                    cursor: 'pointer',
                    left: item.left,
                    top: item.top,
                    zIndex: 1,
                    textAlign: 'center'
                }}
                onMouseEnter={(event) => {
                    this.props.showBtns && this.props.showBtns({idx: idx})
                }}
                onMouseLeave={(event) => {
                    this.props.hideBtns && this.props.hideBtns({idx: idx})
                }}
                onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.props.dropDown({page: this.props.page, idx: idx});
                }}
            >
                <h3 style={{color: '#fff'}}>盖章{idx}</h3>
                {item.showBtns ? <div
                    onClick={() => {
                        this.props.delSeal &&
                        this.props.delSeal({idx: idx})
                    }}
                    style={{
                        position: 'absolute', left: 0,
                        top: this.sealHeight, backgroundColor: '#f00'
                    }}>删除</div> : null}
            </div>
        })
    }
}
