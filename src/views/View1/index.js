import React, { Component } from 'react';
import { Avatar } from 'antd';
import './view1.css';
import'./dashboard_seafoam.png';
export default class View1 extends Component {
    render() {

        return (
            <div id='view1' className='pane'>
                <div className='header'>User Profile</div>
                <div>
                    {/* <div class="main_photo">
                        <img src="./dashboard-seafoam.png" alt="description pf dashboard"/>
                    </div> */}
                    {/* <div class = "image"></div> */}
                    <div className={'avatar-view'}>
                        <Avatar shape="square" size={120} src="./dashboard_seafoam.png" />
                    </div>
                    <div className={'info-view'}>
                        <div>COVID-19 DASHBOARD</div>
                        <div>By Aditi Raj Kandoi</div>
                    </div>
                </div>
            </div>
        )
    }
}
