import React, { Component } from 'react';
import { List } from 'antd';
import './view6.css';

export default class View6 extends Component {

    selectVital = (user) => {
        this.props.changeSelectVital(user);
        console.log(user);
    }

    render() {
        return (
            <div id='view6' className='pane'>
                <div className='header'>Covid Vitals</div>
                <List
                    size="small"
                    bordered
                    dataSource={["D-dimer", "Serum Ferritin", "High Sensitivity Cardiac Troponin I", "IL-6", "Lymphocytes", "Lactate dehydrogenase"]}
                    renderItem={user => <List.Item onClick = {() => this.selectVital(user)}>
                        <div>
                            {user}
                        </div>
                    </List.Item>}
                />
            </div>
        )
    }
}