import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = () => {
    const data = [
        {
          name: 'Audi A3',
          uv: 1000,
          amt: 2400,
        },
        {
          name: 'Audi A4',
          uv: 3000,
          amt: 2210,
        },
        {
          name: 'Audi RS-7',
          uv: 2000,
          pv: 5800,
          amt: 2290,
        },
        {
          name: 'Lamborghini Urus',
          uv: 2780,
          amt: 2000,
        },
        {
          name: 'Ferrari 488 Pista',
          uv: 1890,
          amt: 2181,
        },
        {
          name: 'Ferrari F60 America',
          uv: 3490,
          amt: 2100,
        },
      ];
       
    return (
       <div>
           <BarChart
        width= {1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
       </div>
    );
};

export default Chart;