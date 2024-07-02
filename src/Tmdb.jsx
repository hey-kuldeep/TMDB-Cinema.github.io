import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import "./tmdb.css";
import YouTube from 'react-youtube';
import logo from './assets/theatre-of-ancient-greece-mask-cinema-clip-art-theatre-mask-141077c2f4218e6f4b77a826b623da34.png'
import loading from './assets/No trespassing.gif'
import Rating from 'react-rating';
import yellow from './assets/star-full.png'
import grey from './assets/star-empty.png'

function Tmdb() {
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [video, setVideo] = useState(null);
  const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzM5YTAyNTQ4MjhhZTIwMjdhY2ZhMTgwNWIwNzQ2YiIsIm5iZiI6MTcxOTQxNDAyNi4xODg5OCwic3ViIjoiNjYzZjgzOWVmMGQwMWFiMzRkMDkyNGJhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2D09olhS0Mfm8m-BXoV5dJnk3tplWf7Z7sJ2ar0doA8';

  useEffect(() => {
    async function FetchMovie(movieTitle) {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
          params: { query: movieTitle, include_adult: 'true', language: 'en-US', page: '1' },
          headers: {
            accept: 'application/json',
            Authorization: API_KEY,
          },
        };
        let data1 = await axios.request(options);
        let result = data1.data.results[0];
        setData(result);
        console.log(result)
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }

    if (name) {
      FetchMovie(name);
    }
  }, [name]);

  useEffect(() => {
    const fetchVideo = async (MOVIE_ID) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos`,
          {
            headers: {
              accept: 'application/json',
              Authorization: API_KEY,
            },
          }
        );
        if (response.data.results.length > 0) {
          setVideo(response.data.results[0]);
        } else {
          setVideo(null);
        }
      } catch (error) {
        console.error('Error fetching the video data:', error);
      }
    };

    if (data?.id) {
      fetchVideo(data.id);
    }
  }, [data?.id]);

  const handleSearch = () => {
    setName("")
  };

  return (
    <div>
      <div id="movie-container">
        <div id="logo-container">
          <img
            src={logo}
            alt=""
            height="70px"
            width="70px"
          />
          <h1>TMDB CINEMA</h1>
        </div>
        <div id="inputs">
          <input
            type="text"
            value={name}
            id="movie-info"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search Movies"
          />
          <button type="submit" id="search-btn" onClick={handleSearch}>
            Submit
          </button>
        </div>
      </div>
      <div className='navbar'>
        <ul className='navs'>
          <li><NavLink to="/#app">Trailer</NavLink></li>
          <li><NavLink to="/tvshows">Popular TV Shows</NavLink></li>
          <li><NavLink to="/movies">Popular Movies</NavLink></li>
          <li><NavLink to="/animation">Animation</NavLink></li>
        </ul>
      </div>

      <section>
        <div className="movie-details">
          {data?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt=""
              height="500px"
              width="400px"
            />
          )}
        </div>
        {video ? (
          <div id="movie-about">
            <h2>Movie : {data?.original_title}</h2>
            <h2>Release : {data?.release_date}</h2>
            <Rating
              initialRating={data.vote_average / 2}
              emptySymbol={<img src={grey} className="icon" />}
              fullSymbol={<img src={yellow} className="icon" />}
              readonly
            />
            <p>{data?.overview}</p>
          </div>
        ) : (
            <div className='loader'>
              <img src={loading} height="10px" width='200px' />
              <h3>Enter Movie Name....</h3>
            </div>
          )}
      </section>
      <div className="App" id='app'>
        <div className='list-head1'>
          <h1>TMDb Movie Trailers</h1>
        </div>
        {video ? (
          <div>
            <h2>{video.name}</h2>
            <YouTube videoId={video.key} />
          </div>
        ) : (
            <div className='loader2'>
              <img src={loading} height="10px" width='200px' />
              <p>Loading video...</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default Tmdb;
