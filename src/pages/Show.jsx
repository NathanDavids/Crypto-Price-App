import React from 'react'
import { useParams } from 'react-router-dom'
import showStore from '../stores/showStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Show() {
    const store = showStore()
    const params = useParams()

    React.useEffect(() => {
        store.fetchData(params.id)
    }, []) 

   

    
  return (
    <div>
      {store.data && store.data.image && <img src={store.data.image.large}/>}
      {store.data && store.data.name && <h2>{store.data.name}</h2>}
        <AreaChart
            width={500}
            height={400}
            data={store.graphData}
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
            }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <div>
          <h4>Market Cap Rank</h4>
          {store.data.market_data && store.data.market_data.market_cap_rank &&<span># {store.data.market_cap_rank}</span>}
        </div>
        <div>
          <h4>24h High</h4>
          {store.data.market_data && store.data.market_data.high_24h &&<span>R{store.data.market_data.high_24h.zar}</span>}
        </div>
        <div>
          <h4>24h Low</h4>
          {store.data.market_data && store.data.market_data.low_24h &&<span>R{store.data.market_data.low_24h.zar}</span>}
        </div>
        <div>
          <h4>Circulating Supply</h4>
          {store.data.market_data && store.data.market_data.circulating_supply &&<span>R{store.data.market_data.circulating_supply}</span>}
        </div>
        <div>
          <h4>Current Price</h4>
          {store.data.market_data && store.data.market_data.current_price &&<span>R{store.data.market_data.current_price.zar}</span>}
        </div>
        <div>
          <h4>1y Change</h4>
          {store.data.market_data && store.data.market_data.price_change_percentage_1y &&<span>{store.data.market_data.price_change_percentage_1y.toFixed(2)}%</span>}
        </div>
    </div>
  )
};
 