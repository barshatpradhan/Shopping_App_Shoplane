import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
