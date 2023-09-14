import React from 'react'
import { Link } from 'react-router-dom'
import '../components/style.scss'
import { AiOutlineLeft } from 'react-icons/ai'

export default function Header({ back }) {
  return (
    <header className='header'>
        <div className='width'>
            {back && (
            <Link to="/">
            <AiOutlineLeft className="icon"/>
            </Link>
            )}
            <h1>
                <Link to="/">Crypto</Link>
            </h1>
        </div>
    </header>
  )
}
