import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import LiveChart from "./LiveChart";

export default class  Speedometer extends Component {

  constructor(props) {
    super(props);
    this.state= {cpuload: 10};

  }
  componentDidMount(){
    var that = this
    var source = new EventSource("http://localhost:3001/stream");
    source.onmessage= function(e) {
    var notification = JSON.parse(e.data);
    that.setState({cpuload:notification})
    console.log(notification);
  };
  source.onerror = function(e) {
    console.log("EventSource failed.");
  };

  }

render(){
return (
  <div>
    <ReactSpeedometer startColor="green" endColor="red" minValue={0} maxValue={100} value={this.state.cpuload}/>
    <LiveChart value={this.state.cpuload}></LiveChart>
  </div>
)
}
}
