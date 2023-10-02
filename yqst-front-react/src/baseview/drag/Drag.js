import React, {Component} from 'react';
import findIndex from 'lodash/findIndex';

class Drag extends Component {

    constructor(props) {
        super(props);
        this.windowWidth = document.documentElement.clientWidth;
        this.windowHeight = document.documentElement.clientHeight;
        this.state = {
            dataArray: [
                {
                    key: 1,
                    title: 'AAAAAA'
                },
                {
                    key: 2,
                    title: 'BBBBBB'
                },
                {
                    key: 3,
                    title: 'CCCCCC'
                },
            ],
            dragElement: null,
            lock: true,
        };
    }

    componentDidMount() {
        document.addEventListener('dragover', this.preventDefault);
        document.addEventListener('drop', this.preventDefault);
    }

    componentWillUnmount() {
        document.removeEventListener('dragover', this.preventDefault);
        document.removeEventListener('drop', this.preventDefault);
    }

    preventDefault = (e) => {
        e.preventDefault();
    }

    render() {
        let {dataArray} = this.state;

        return (
            <div
                style={{marginTop: '10px'}}
            >
                {
                    dataArray && dataArray.map((item, idx) => {
                        return this.sortableCard(item);
                    })
                }
            </div>
        );
    }

    sortableCard(sortableInfo){
        const { key } = sortableInfo;
        return (
            <div
                key={key}
                draggable
                onDragStart={() => {
                    this.setState({
                        dragElement: sortableInfo,
                    });
                }}
                onDragEnd={(e) => {
                    e.preventDefault();
                }}
                onDragEnter={() => {
                    if (key !== this.state.dragElement.key) {
                        const oldDragIndex = findIndex(this.state.dataArray, item => item.key === this.state.dragElement.key);
                        const oldEnterIndex = findIndex(this.state.dataArray, item => item.key === sortableInfo.key);
                        if (oldDragIndex > oldEnterIndex) {
                            const newDataArray= this.state.dataArray.filter(item => item.key !== this.state.dragElement.key);
                            const insertIndex = findIndex(newDataArray, item => item.key === sortableInfo.key);
                            newDataArray.splice(insertIndex, 0, this.state.dragElement);
                            this.setState({ dataArray: newDataArray });
                        } else {
                            const newDataArray = this.state.dataArray.filter(item => item.key !== this.state.dragElement.key);
                            const insertIndex = findIndex(newDataArray, item => item.key === sortableInfo.key) + 1;
                            newDataArray.splice(insertIndex, 0, this.state.dragElement);
                            this.setState({ dataArray: newDataArray });
                        }
                        this.setState({
                            isConfigDirty: true,
                        });
                    }
                }}
                onDragLeave={() => {
                    if (sortableInfo.key !== this.state.dragElement.key) {
                        if (this.state.lock && sortableInfo.key === this.state.dataArray[this.state.dataArray.length - 1]) {
                            const newDataArray = this.state.dataArray.filter(item => item.key !== this.state.dragElement.key);
                            newDataArray.push(this.state.dragElement);
                            this.setState({
                                lock: false,
                            }, () => {
                                this.setState({
                                    dataArray: newDataArray,
                                });
                            });
                        } else {
                            this.setState({
                                lock: true,
                            });
                        }
                    }
                }}
            >
                <div
                    style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}
                >
                    {
                        sortableInfo.title
                    }
                </div>
            </div>
        );
    }

}

export default Drag
