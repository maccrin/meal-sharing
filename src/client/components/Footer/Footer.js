import React from "react";
import './footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="footer">
                {`Copyright © Maddy Code ${year}`}
            </div>
        </footer>
    )
}

export default Footer