import React, { Component } from 'react';
import './view4.css';
import ScatterPlot from '../../charts/ScatterPlot';

export default class View4 extends Component {
    render() {
        const {user} = this.props,
              width = 1100,
              height = 250;
        return (
            <div id='view4' className='pane' >
                <div className='header'>Plot of user vitals over a time period</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                    <ScatterPlot data={user} width={width} height={height}/>
                </div>
            </div>
        )
    }
}