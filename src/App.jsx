import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Tmdb from './Tmdb';
import PopularTVShows from './PopularTvShows';
import PopularMovies from './PopularMovies';
import Animation from './Animation';
import ShowDetails from './ShowDetails'; 
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div>
        {/* Your navigation component (if any) can be placed here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tvshows" element={<PopularTVShows />}/>
          <Route path="/tv/:id" element={<ShowDetails />} />
          <Route path="movies" element={<PopularMovies />} />
          <Route path="animation" element={<Animation />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <Tmdb />
      <PopularTVShows/>
      <PopularMovies/>
      <Animation/>
      <Footer/>
    </div>
  );
}

export default App;

