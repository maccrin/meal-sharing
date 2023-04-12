import React, { useCallback, useEffect } from "react";
import ErrorPic from "../../assets/images/error.jpg";
import "./error.css";
const ErrorPage = () => {
  return (
    <>
      <img src={ErrorPic} className="errorpic" alt="Error Page Picture" />
    </>
  );
};

export default ErrorPage;
