import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import ParallelD3 from '../d3/ParallelD3';
import { color } from 'd3';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
class Parallel extends Component {
    componentDidMount() {
        this.parallel = new ParallelD3(this.el, this.props);
    }

    componentDidUpdate() {
        this.parallel.update(this.props);
    }

    render () {     
          return <div id={this.props.id} ref={el => {this.el = el}} />
    }
    
}

Parallel.defaultProps = {};

Parallel.propTypes = {
    /**
    * The ID used to identify this component in Dash callbacks.
    */
    id: PropTypes.string,
    setProps: PropTypes.func,

    data: PropTypes.arrayOf(PropTypes.object),

    do_color: PropTypes.bool,
    ordinal_scale: PropTypes.bool,
    color_encode_column: PropTypes.string,

    width: PropTypes.number,
    height: PropTypes.number,

    margin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    }),

    line: PropTypes.object

};

export default Parallel