import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce (async () => {
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

        set({coins})
        } else {
            set({ coins: trending })
        }
    }, 500),
  
    fetchCoins: async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
    
    const coins = res.data.coins.map(coins => {
        return{
            name: coins.item.name, 
            image: coins.item.large,
            id: coins.item.id,
            priceBtc: coins.item.price_btc
        }
    })

    set({coins, trending: coins})
  }
}))

export default homeStore