import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import yellow from './assets/star-full.png'
import grey from './assets/star-empty.png'

const PopularCartoons = () => {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pgno, setpgno] = useState(1);


  useEffect(() => {
    const fetchCartoons = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          params: {
            api_key: '1cf50e6248dc270629e802686245c2c8', 
            language: 'en-US',
            sort_by: 'popularity.desc',
            with_genres: '16', 
            page: pgno,
          },
        });
        setCartoons(response.data.results);
      } catch (error) {
        setError('Error fetching popular cartoons');
      } finally {
        setLoading(false);
      }
    };

    fetchCartoons();
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
    <div className="container" id='animation'> 
      <div className='list-head1'>
        <h1>Popular Animation</h1>
        <div className='pages'>
        <button onClick={()=>setpgno(pgno-1)}>Back</button>
        /
        <button onClick={()=>setpgno(pgno+1)}>Next</button>
        </div>
      </div>
      <div className="card-container">
        {cartoons.map((cartoon) => (
          <div key={cartoon.id} className="card">
            {cartoon.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${cartoon.poster_path}`}
                alt={cartoon.name}
              />
            )}
            <div className="card-content">
              <h2 className="card-title">{cartoon.name}</h2>
              <small>{cartoon.first_air_date}</small>
              <Rating
                className='rating'
                initialRating={cartoon.vote_average / 2} // Convert TMDB's 10-point scale to 5-point scale
                emptySymbol={<img src={grey} className="icon" />}
                fullSymbol={<img src={yellow} className="icon"  />}
                readonly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCartoons;
