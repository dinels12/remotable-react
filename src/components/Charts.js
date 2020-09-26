import React, { Component } from "react";
import { VictoryLine, VictoryChart } from "victory";

export default class Charts extends Component {
  state = {
    zoomDomain: { x: [new Date("2020-05-17"), new Date(Date.now())] },
  };

  render() {
    return (
      <div>
        <h1 className='text-center'>{this.props.name}</h1>
        <VictoryChart width={800} height={300} scale={{ x: "time" }}>
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
              labels: {
                fontSize: 12,
                fill: "black",
              },
            }}
            data={this.props.data}
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>
      </div>
    );
  }
}
