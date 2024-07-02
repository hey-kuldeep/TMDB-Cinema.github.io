import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PopularTVShows.css';
import Rating from 'react-rating';
import yellow from './assets/star-full.png';
import grey from './assets/star-empty.png';

const PopularTVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pgno, setpgno] = useState(1);


  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          params: {
            sort_by: 'popularity.desc',
            api_key: '1cf50e6248dc270629e802686245c2c8',
            language: 'en-US',
            page: pgno,
          },
        });
        setShows(response.data.results);
      } catch (error) {
        setError('Error fetching popular TV shows');
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [pgno]);

  if(pgno===0){
    setpgno(1)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container" id="Tvshows">
      <div className="list-head1">
        <h1>Popular TV Shows</h1>
        <div className='pages'>
        <button onClick={()=>setpgno(pgno-1)}>Back</button>
        /
        <button onClick={()=>setpgno(pgno+1)}>Next</button>
        </div>
      </div>
      <div className="card-container">
        {shows.map((show) => (
          <Link key={show.id} to={`/tv/${show.id}`} className="card-link">
            <div className="card">
              {show.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                  alt={show.name}
                />
              )}
              <div className="card-content">
                <h2 className="card-title">{show.name}</h2>
                <h6>{show.first_air_date}</h6>
                <Rating
                className='rating'
                  initialRating={show.vote_average / 2}
                  emptySymbol={<img src={grey} className="icon" alt="Empty Star" />}
                  fullSymbol={<img src={yellow} className="icon" alt="Filled Star" />}
                  readonly
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTVShows;
