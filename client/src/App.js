import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Shared/Header/Header";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";

import Allblogs from "./Pages/Blogs/Allblogs";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import AddBlog from "./Pages/Blogs/AddBlog";
import AuthGuard from "./AuthGuard";
import Myblogs from "./Pages/Blogs/Myblogs";
import Footer from "./Shared/Footer/Footer";
import "./global.scss"



function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/blogs"
            element={
              <AuthGuard>
                <Allblogs />
              </AuthGuard>
            }
          />
          <Route
            path="/add-blog"
            element={
              <AuthGuard>
                <AddBlog />
              </AuthGuard>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <AuthGuard>
                <BlogDetails />
              </AuthGuard>
            }
          />
            <Route
            path="/my-blogs"
            element={
              <AuthGuard>
                <Myblogs />
              </AuthGuard>
            }
          />
        </Routes>
        <Footer/>
      </>
    </Router>
  );
}

export default App;
