import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopularTVShows.css'; // Make sure this CSS file exists and styles are applied correctly
import Rating from 'react-rating';
import yellow from './assets/star-full.png';
import grey from './assets/star-empty.png';

const PopularMovies = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pgno, setpgno] = useState(1);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/day', {
          params: {
            sort_by: 'popularity.desc',
            api_key: '1cf50e6248dc270629e802686245c2c8',
            language: 'en-US',
            page: pgno,
          },
        });
        setMedia(response.data.results);
      } catch (error) {
        setError('Error fetching popular media');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
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
    <div className="container" id="media-list">
      <div className="list-head1">
        <h1>Popular Movies</h1>
        <div className='pages'>
        <button onClick={()=>setpgno(pgno-1)}>Back</button>
        /
        <button onClick={()=>setpgno(pgno+1)}>Next</button>
        </div>
      </div>
      <div className="card-container">
        {media.map((item) => (
          <div key={item.id} className="card">
            {item.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
              />
            )}
            <div className="card-content">
              <h2 className="card-title">{item.title || item.name}</h2>
              <small>{item.first_air_date || item.release_date}</small>
              <Rating
                className='rating'
                initialRating={item.vote_average / 2} 
                emptySymbol={<img src={grey} className="icon" />}
                fullSymbol={<img src={yellow} className="icon" />}
                readonly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
