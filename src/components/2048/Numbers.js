import React, { Component } from 'react';
import PropTypes from 'prop-types';

Numbers.propTypes = {
    numberName: PropTypes.string,
    numberNamePrint: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default class Numbers extends Component {
    static defaultProps = {
        numberName: 'n0'
    };

    render = () => {
        let numberName = this.props.numberName,
            numberNamePrint = this.props.numberNamePrint;

        if (numberNamePrint === 0) numberNamePrint = '';

        return <div className={numberName}>{numberNamePrint}</div>;
    };
}