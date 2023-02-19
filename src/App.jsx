import React, { lazy, Suspense, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import "./styles/App.scss";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetail.jsx"));
const SearchPage = lazy(() => import("./pages/SearchResult.jsx"));

//Switch to the HashRouter since GitHub pages doesn't support the tech used by the BrowserRouter
const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading ...</h1>}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="*" element={<h1 className="error">404 Page</h1>} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
