import React from "react";
import { VictoryLine, VictoryChart } from "victory";

interface Props {
  name: string;
  data: any;
}

const Charts = (props: Props) => {
  return (
    <div>
      <h1 className='text-center'>{props.name}</h1>
      <VictoryChart width={800} height={300} scale={{ x: "time" }}>
        <VictoryLine
          style={{
            data: { stroke: "tomato" },
            labels: {
              fontSize: 12,
              fill: "black",
            },
          }}
          data={props.data}
          labels={({ datum }) => datum.y}
        />
      </VictoryChart>
    </div>
  );
};

export default Charts;
