import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { parseCookies } from "nookies";


const AuthGuard = ({ children }) => {
    const cookies = parseCookies();
  const isAuthenticated = cookies?.token; // Adjust this logic based on your authentication method
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Helmet>
        <title>Protected Page</title>
        <meta name="description" content="This is a protected page" />
      </Helmet>
      {children}
    </>
  );
};

export default AuthGuard;
