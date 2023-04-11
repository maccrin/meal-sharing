import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <>
            <h1>404</h1>
            <h3>This Page doesn't exsist</h3>
            <Link to="/">Go To Home</Link>
        </>
    )

}

export default ErrorPage;