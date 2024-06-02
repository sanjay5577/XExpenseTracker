import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer  ,  Legend} from 'recharts';


const COLORS = ['#A000FF', '#FF9304', '#FDE006'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent  =({expenselist}) =>{

    const reducedData = expenselist.reduce((acc, curr) => {
        const existingItem = acc.find(item => item.category === curr.category);
        if (existingItem) {
          existingItem.price += curr.price;
        } else {
          acc.push({ category: curr.category, price: curr.price });
        }
        return acc;
      }, []);

      const renderCustomLegend = () => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {reducedData.map((entry, index) => (
              <div key={`item-${index}`} style={{ marginRight: '10px', display: 'flex',  }}>
                <div
                  style={{
                    width: '50px',
                    height: '10px',
                    backgroundColor: COLORS[index % COLORS.length],
                    marginRight: '5px',
                  }}
                />
                <span>{entry.category}</span>
              </div>
            ))}
          </div>
        );
      };
      
  

  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            data={reducedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="price"
          >
            {reducedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    );
  
}

export default PieChartComponent;
