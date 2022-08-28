import React, { Component } from 'react';
import { Slider, Divider } from 'antd';
import './view3.css';

const plainOptions = ['Male', 'Female'];
const defaultCheckedList = ['Male', 'Female'];

const radioOption = ["Cases", "Death"]
const raceOptions = ['Asian', 'White', 'Native Hawaiian or Other Pacific Islander', 'Black or African American', 'Others'];
const ageGroups = ['0-10', '10-18', '18-30', '30-50', '50+'];

export default class View3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioBox: false,
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue = event => {
        const filter = event.target.value === "Survivors" ? 0 : 1;
        this.props.setFilter(filter);
        console.log(filter);
      } 



    onChangeSilder = value => {
        this.props.changeGreaterThenAge(value);
    }

    render() {
        return (
            <div id='view3' className='pane'>
                <div className='header'>Filter</div>
                <h3>Covid Patients</h3>
                <div style={{ width: 275, margin: 5 }}>
                    <div defaultValue={"Survivors"} onChange={this.onChangeValue}>
                    <input type="radio" value="Survivors" name="covid" /> Survivors
                    <br />
                    <input type="radio" value="Non-Survivors" name="covid" /> Non-Survivors
                    </div>
                </div>
                <Divider />
                <h3>Age</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder}/>
            </div>
        )
    }
}