import React, { Component } from 'react';
import * as d3 from "d3";
import {scaleTime,scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';

console.log(d3);

export default class  LiveChart extends Component {

  constructor(props) {
    super(props);
    this.state= {path: ""};

  }
  componentDidMount(){

    var limit = 60 * 1,
          duration = 750,
          now = new Date(Date.now() - duration)

      var width = 500,
          height = 200;
          var groups = {
            current: {
                value: 0,
                color: 'orange',
                data: d3.range(limit).map(function() {
                    return Math.random()*(50-20+1+20);
                })
            }
        };

        console.log(groups);
    var x = scaleTime()
            .domain([now - (limit - 2), now - duration])
            .range([0, width])
            var y = d3.scaleLinear()
                        .domain([0, 100])
                        .range([height, 0])
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
                                    .attr('width', width)
                                    .attr('height', height + 50)

                                var axis = svg.append('g')
                                    .attr('class', 'x axis')
                                    .attr('transform', 'translate(0,' + height + ')')
                                    .call(x.axis = d3.axisBottom(x))

                                    console.log(axis);
                                var paths = svg.append('g')

                                for (var name in groups) {
                                    var group = groups[name];
                                    console.log(name);
                                    console.log(group);
                                    group.path = paths.append('path')
                                        .data([group.data])
                                        .attr('class', name + ' group')
                                        .style('stroke', group.color)
                                }





                                var tick = function() {
            now = new Date()

            // Add new values
            for (var name in groups) {
                var group = groups[name]
                //group.data.push(group.value) // Real values arrive at irregular intervals
                group.data.push(20 + Math.random() * 100)
                group.path.attr('d', l)
            }

            // Shift domain
            x.domain([now - (limit - 2) * duration, now - duration])

            // Slide x-axis left
           axis.transition()
                .duration(duration)
                .ease(d3.easeBounce)
                .call(x.axis)


            // Slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease(d3.easeBounce)
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
              //  .each('end', tick)

            // Remove oldest data point from each group
            /*for (var name in groups) {
                var group = groups[name]
                group.data.shift()
            }*/
        }

        tick();

  }




render(){
return (
  <div>
  <div className="graph">LiveChart</div>
  <svg className="charts" width="500" height="300">
    <path d={this.state.path} >

    </path>
  </svg>
 </div>

)
}
}
