import axios from 'axios'
import { create } from 'zustand'
import '../pages/Show'

const showStore = create((set) => ({
    graphData: [],
    
    fetchData: async (id) => {
        const graphRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=zar&days=121`);
        const dataRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`);

        const graphData = graphRes.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                Price: p,
            };
        });

        console.log(dataRes);

        set({ graphData });
    }
}));

export default showStore