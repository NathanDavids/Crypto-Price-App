import axios from 'axios'
import { create } from 'zustand'

const showStore = create((set) => ({
    graphData: [],
    data: {}, // Add data property

    reset: () => {
        set({ graphData: [], data: null })
    },

    fetchData: async (id) => {
        try {
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

            console.log('Fetched graph data:', graphData); // Log the fetched graph data
            console.log('Fetched coin data:', dataRes.data); // Log the fetched coin data

            set({ graphData, data: dataRes.data }); // Update graphData and data properties
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}));

export default showStore;