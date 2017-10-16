import React, { Component } from 'react';
import * as d3 from "d3";
import {scaleTime,scaleLinear} from 'd3-scale';
import {line,area} from 'd3-shape';
import PropTypes from 'prop-types';

const limit = 70,
       duration = 700;
let    now = new Date(Date.now() - duration);

const  getX = width => scaleTime().domain([now - (limit - 2), now - duration]).range([0, width]);

const  getY = height=> d3.scaleLinear().domain([0, 100]).range([height, 0]);

const getline = (x,y)=> line().curve(d3.curveBasis)
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function(d) {
                return y(d)
            });


class  RealTimeChart extends Component {

  constructor(props) {
    super(props);
    this.state= {
          cpuLoads:this.props.cpuLoads
    };
  }

  componentWillReceiveProps(nextProps){

    /*this.setState({
          cpuLoads:this.props.cpuLoads.push(nextProps.currentLoad)
    })*/
  }

  componentDidMount(){

        var that =this;
        var pathData = this.props.cpuLoads;
        var x = getX(this.props.width);
        var y = getY(this.props.height);
        var l = getline(x,y);

        var svg = d3.select('.graph').append('svg')
                    .attr('class', 'chart')
                    .attr('width', this.props.width)
                    .attr('height', this.props.height + 50)

        var parent = svg.append('g')
                    .attr('transform', 'translate(' + 20 + ',' + 5 + ')');

        var xaxis = parent.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.props.height + ')')
                    .call(x.axis = d3.axisBottom(x));

      var yaxis =  parent.append('g')
                    .attr('class', 'y axis')
                    .attr("transform", "translate(2,0)")
                    .call(y.axis = d3.axisLeft(y))

     var paths =  parent.append('g')
     var path  =  paths.append('path')
                 .data([pathData])
                 .attr('class', 'current group')
                 .style('stroke', this.props.lineColor)

              //let xAxis1 =d3.axisBottom(x);
              //d3.select(this.xAxisElement).call(xAxis1)

           function tick() {
            now = new Date()
            pathData.push(that.props.currentLoad);
            path.attr('d', l)
            x.domain([now - (limit - 2) * duration, now - duration]);
            // slide x-axis left
            xaxis.transition().duration(duration).ease(d3.easeBounce).call(x.axis);
            // slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease(d3.easeBounce)
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .on("end", tick)
            //remove oldest cpu load
            pathData.shift();
        }
        tick();
  }


render(){

return (
  <div>
    <div>Live Chart</div>
    <div className="graph"></div>
      <svg className="chart" width={this.props.width} height={this.props.height}>
      <g transform="translate(20,5)">
           <g className="x axix" transform="translate(0,100)" ref={(el) => { this.xAxisElement = el; }}>
           </g>
      </g>
  </svg>
 </div>

)
}
}

RealTimeChart.defaultProps = {
      width:500,
      height:350,
      lineColor:'orange',
      cpuLoads:d3.range(limit).map(function() {
          return 0;
      })
}
RealTimeChart.propTypes ={
      width:PropTypes.number,
      height:PropTypes.number,
      lineColor:PropTypes.string,
      cpuLoads:PropTypes.array
}


export default RealTimeChart;
