import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import RealTimeChart from "../components/RealTimeChart";

export default class  Speedometer extends Component {

  constructor(props) {
    super(props);
    this.state= {cpuload: 0, errorMessage:""};

  }

  componentDidMount(){

     const source = new EventSource("http://localhost:3001/stream");

     source.onmessage= function(e) {
       this.setState({cpuload:JSON.parse(e.data)})
     }.bind(this);

     source.onerror = function(e) {
        this.setState({errorMessage:"CPU load Source failed."});
     }.bind(this);

  }

render(){
return (
  <div>
    <div className="error">{this.state.errorMessage}</div>
    <ReactSpeedometer startColor="green" endColor="red"  height={200} minValue={0} maxValue={100} value={this.state.cpuload}/>
    <RealTimeChart currentLoad={this.state.cpuload}></RealTimeChart>
  </div>
)
}
}
