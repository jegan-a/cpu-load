import React, { Component } from 'react';
import * as d3 from "d3";
import {scaleTime,scaleLinear} from 'd3-scale';
import {line,area} from 'd3-shape';

 class  RealTimeChart extends Component {

  constructor(props) {
    super(props);
    this.state= {path: ""};

  }
  componentDidMount(){
          var that =this;
          var limit = 60*1,
          duration = 700,
          now = new Date(Date.now() - duration)


          var groups = {
            current: {
                value: that.props.value,
                color: 'orange',
                data: d3.range(limit).map(function() {
                    return that.props.value;
                })
            }
        };


    var x = scaleTime()
            .domain([now - (limit - 2), now - duration])
            .range([0, this.props.width])
            var y = d3.scaleLinear()
                        .domain([0, 100])
                        .range([this.props.height, 0])
                        var l = line()
                                    .curve(d3.curveBasis)
                                    .x(function(d, i) {
                                        return x(now - (limit - 1 - i) * duration)
                                    })
                                    .y(function(d) {
                                        return y(d)
                                    })

                                var svg = d3.select('.graph').append('svg')
                                    .attr('class', 'chart')
                                    .attr('width', this.props.width)
                                    .attr('height', this.props.height + 50)

                                var axis = svg.append('g')
                                    .attr('class', 'x axis')
                                    .attr('transform', 'translate(0,' + this.props.height + ')')
                                    .call(x.axis = d3.axisBottom(x))

                                var yaxis = svg.append('g')
                                        .attr('class', 'y axis')
                                         .attr("transform", "translate(30,0)")
                                        .call(y.axis = d3.axisLeft(y))



                                var paths = svg.append('g')

                                for (var name in groups) {
                                    var group = groups[name];
                                    group.path = paths.append('path')
                                        .data([group.data])
                                        .attr('class', name + ' group')
                                        .style('stroke', group.color)
                                }





           function tick() {
            now = new Date()
            // Add new values
            for (var name in groups) {
                var group = groups[name]
                group.data.push(that.props.value);
                group.path.attr('d', l)
            }
            // Shift domain
            x.domain([now - (limit - 2) * duration, now - duration])
            // Slide x-axis left
            axis.transition()
                .duration(duration)
                .ease(d3.easeBounce)
                .call(x.axis)


            // slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease(d3.easeBounce)
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .on("end", tick)

                //remove oldest data point from each group
              for (var name in groups) {
                var group = groups[name]
                group.data.shift()
             }
        }
        tick();
  }

render(){
return (
  <div>
  <div className="graph">LiveChart</div>
  <svg className="charts" width={this.props.width+100} height={this.props.height+100}>
    <path d={this.state.path} >

    </path>
  </svg>
 </div>

)
}
}

RealTimeChart.defaultProps = {
      width:500,
      height:350
}
export default RealTimeChart;
