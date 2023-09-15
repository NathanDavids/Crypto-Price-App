import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',
    searching: false,

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce (async () => {
        set ({ searching: true });
        const {query, trending} = homeStore.getState()

        if (query.length > 2) {
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        
        const coins = res.data.coins.map(coin => {
            return{
                name: coin.name, 
                image: coin.large, 
                id: coin.id
            }
        })

        set({coins, searching: false})
        } else {
            set({ coins: trending, searching: false })
        }
    }, 500),
  
    fetchCoins: async () => {
        const [res, btcRes] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=zar'),
        ])

        const btcPrice = btcRes.data.bitcoin.zar;
        console.log(btcPrice);
    
    const coins = res.data.coins.map(coins => {
        return{
            name: coins.item.name, 
            image: coins.item.large,
            id: coins.item.id,
            priceBtc: coins.item.price_btc.toFixed(10),
            priceZar: (coins.item.price_btc * btcPrice).toFixed(10),
        }
    })

    console.log(coins)

    set({coins, trending: coins})
  }
}))

export default homeStore