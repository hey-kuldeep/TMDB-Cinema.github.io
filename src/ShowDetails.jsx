import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import yellow from './assets/star-full.png';
import grey from './assets/star-empty.png';
import './ShowDetails.css'; 
import loader from './assets/No trespassing.gif'


const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: '1cf50e6248dc270629e802686245c2c8',
            language: 'en-US',
          },
        });
        setShow(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        setError('Error fetching show details');
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) {
   return <div className='loder'> <img src={loader} height="10px" width='200px' /></div> 
  }

  if (error) {
    return <div className="show-details">{error}</div>;
  }

  if (!show) {
    return null; 
  }

  return (
    <div className='container'>
    <div className="show-details">
      <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} alt={show.name} />
      <div className='alldetails'>
      <h2>{show.name}</h2>
      <p><strong>Language:</strong> {show.spoken_languages[0].english_name}</p>
      <p className="genres"><strong>Genres:</strong> {show.genres.map((genre) => (
        <span key={genre.id}>{genre.name},</span>
      ))}</p>
      <div className="box">
        <Rating
          className="rating"
          initialRating={show.vote_average / 2}
          emptySymbol={<img src={grey} className="icon" alt="empty star" />}
          fullSymbol={<img src={yellow} className="icon" alt="yellow star" />}
          readonly
        />
      </div>
      <p className="overview">{show.overview}</p>
    </div>
    </div>
    </div>
  );
};

export default ShowDetails;
