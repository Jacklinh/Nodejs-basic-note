import React from 'react'
import Link from 'next/link'
import IconCart from '../../common/IconCart'
import Register from '../../common/Register'
const Header = () => {
    return (
        <header className='header_wrap'>
            <div className="container mx-auto">
                <div className="header_inner">
                    <h1 className='header_logo'><Link href='/'>RinKart</Link></h1>
                    <ul className="header_nav">
                        <li>
                            <IconCart />
                        </li>
                        <li>
                            <Register />
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header