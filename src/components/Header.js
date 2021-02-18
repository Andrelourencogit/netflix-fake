import React from 'react'

import '../styles/Header.css'

export default ({black}) => {
    return (
        <header className={black ? 'black': ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://variety.com/wp-content/uploads/2020/05/netflix-logo.png" alt="Netflix"></img>
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn.png" alt="Usuário"></img>
                </a>
            </div>
        </header>
    )
}


