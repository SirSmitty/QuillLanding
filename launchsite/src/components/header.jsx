import React from "react";
import './header.css'
import QuillLogo from '/QUILLwhite.svg';

function Header() {

    const navLinks = ["Company", "Products", "Contribute"];

    return (
        <>
            <div className="header">
                <div className="logo-container">
                    <img src={QuillLogo} alt="Quill Logo" />
                </div>
                <nav aria-label="Main navigation">
                    <ul className="nav-list">
                        {navLinks.map((link, index) => (
                            <li key={index} className="nav-link" tabIndex={0}>
                                {link}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )

}

export default Header