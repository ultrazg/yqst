import React, {PureComponent, Fragment} from 'react';

class HehTitle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <div style={styles.container}>
                    <span style={styles.left}/>
                    <h2 style={styles.right}>{this.props.children}</h2>
                </div>
            </Fragment>
        );
    }
}

export default HehTitle;
const styles = {
    container: {
        height: 30,
    },
    left: {
        width: 3,
        height: '100%',
        backgroundColor: '#1890FF',
        display: 'inline-block',
        marginRight: 10,
        verticalAlign: 'baseline'
    },
    right: {
        marginBottom: 0,
        display: 'inline-block',
        height: 30,
        verticalAlign: 'top'
    }
};
