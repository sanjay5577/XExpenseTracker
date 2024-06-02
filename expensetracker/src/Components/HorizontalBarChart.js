import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const HorizontalBarChart =({expenselist}) =>{

    const reducedData = expenselist.reduce((acc, curr) => {
        const existingItem = acc.find(item => item.category === curr.category);
        if (existingItem) {
          existingItem.price += curr.price;
        } else {
          acc.push({ category: curr.category, price: curr.price });
        }
        return acc;
      }, []);


      // console.log(reducedData)
      
      const renderCustomBarShape = (props) => {
        const { x, y,width, height, fill } = props;
        const radius = 10; // Adjust the radius as needed
      
        return (
          <g>
            <path d={`M${x},${y + height / 2} L${x},${y + height} L${x + width - radius},${y + height} Q${x + width},${y + height},${x + width},${y + height - radius} L${x + width},${y + radius} Q${x + width},${y},${x + width - radius},${y} L${x},${y} Z`} fill={fill} />
          </g>
        );
      };

      



  return (
    <ResponsiveContainer width="60%" height={345}>
      <BarChart
        data={reducedData}
        layout="vertical"
        margin={{ top: 20, right: 20, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3"  vertical={false} horizontal={false}/>
        <XAxis type="number" tick={false} axisLine={false} />
        <YAxis dataKey="category" type="category" axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8"  barSize={20} shape={renderCustomBarShape}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
