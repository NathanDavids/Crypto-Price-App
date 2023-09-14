import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem({ coin }) {
  return (
    <div className='home-crypto-list'>
        <Link to={`/${coin.id}`}>
            <span className='home-crypto-image'><img src={coin.image} alt="" /></span>
            <span className='home-crypto-name'>{coin.name}</span>
            <span className='home-crypto-prices'>
                <span className='home-crypto-btc'>{coin.priceBtc} BTC </span>
                <span className='home-crypto-zar'>(R{coin.priceZar})</span>
            </span>
        </Link>
    </div>
  )
}
