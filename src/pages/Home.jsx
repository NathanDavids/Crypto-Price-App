import React from 'react'
import '../main'
import homeStore from '../stores/homeStore'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Home() {
    const store = homeStore()

    React.useEffect(() => {
        store.fetchCoins()
    }, [])
    
    return (
        <div>
            <Header />
            <header className='home-search'>
                <div className="width">
                <h2> Search for a coin </h2>
                <input type='text' value={store.query} onChange={store.setQuery}/>
                </div>
            </header>
            {store.coins.map(coin => {
                return (
                    <div key={coin.id}>
                        <Link to={`/${coin.id}`}>
                            {coin.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}