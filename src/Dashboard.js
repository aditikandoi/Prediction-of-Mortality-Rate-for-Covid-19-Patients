import React, { Component } from 'react';
import data1 from './data/data.js';
import data2 from './data/vitals.js'
import { Layout } from 'antd';
import View1 from './views/View1';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
import View5 from './views/View5';
import View6 from './views/View6';
import './dashboard.css';
import * as d3 from 'd3';

const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedVital: "Lymphocytes",
            greaterThenAge: 0,
            includedGender: ['Male', 'Female'],
            includedRace: ['Asian', 'White', 'Pacific Islander', 'Black or African American', 'Others'],
            genderData : [],
            filter: 0
        }
    }

    changeSelectVital = value => {
        this.setState({
            selectedVital: value
        })
    }

    changeGreaterThenAge = value => {
        this.setState({
            greaterThenAge: value
        })
    }

    changeIncludedGender = value => {
        this.setState({
            includedGender: value
        })
    }
    
    changeIncludedRace = value => {
        this.setState({
            includedRace: value
        })
    }

    setFilter = value => {
        this.setState({
            filter: value
        })
    }

    setData = value => {
        if (value === "Deaths") {
            return data1.filter(user=>user.status===1)
        }
        else {
            return data1
        }
    }



    render() {
        const {selectedVital, greaterThenAge, includedGender, includedRace, filter} = this.state;
        const vitalsData = data2.filter(user=>user.vitals===selectedVital);
        const filteredData = data1.filter(user=>includedGender.indexOf(user.gender)!==-1)
                                 .filter(user=>user.age>greaterThenAge)
                                 .filter(user=>user.status>=filter);
        const filteredDataRace = data1.filter(user=>includedRace.indexOf(user.race)!==-1)
                                .filter(user=>user.age>greaterThenAge)
                                .filter(user=>user.status>=filter);
                                
        return (
            <div>                                       
                <Layout style={{ height: 920 }}>
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 300 }}>
                            <View6 changeSelectVital={this.changeSelectVital}/>
                        </Content>
                        <Content style={{ height: 300 }}>
                        <View3 
                            setFilter={this.setFilter}
                            changeGreaterThenAge={this.changeGreaterThenAge}
                            changeIncludedGender={this.changeIncludedGender}
                            changeIncludedRace={this.changeIncludedRace}       
                        />
                        </Content>
                    </Sider>
                    <Layout>
                        <Content style={{ height: 300 }}>
                            <View4 user={vitalsData}/>
                        </Content>
                        <Layout style={{ height: 600 }}>
                            <Content>
                                <View5 
                                    data={filteredDataRace}
                                    setFilter={this.setFilter}
                                />
                            </Content>
                            <Sider width={700} style={{backgroundColor:'#eee'}}>
                                <Content style={{ height: 600 }}>
                                <View2 data={filteredData}/>
                                </Content>
                                {/* <Content style={{ height: 300 }}>
                                    <View3 
                                        setFilter={this.setFilter}
                                        changeGreaterThenAge={this.changeGreaterThenAge}
                                        changeIncludedGender={this.changeIncludedGender}
                                        changeIncludedRace={this.changeIncludedRace}       
                                    />
                            </Content> */}
                            </Sider>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout>
                    <Footer style={{ height: 20 }}>
        
                    </Footer>
                </Layout>
            </div>
        )
    }
}
