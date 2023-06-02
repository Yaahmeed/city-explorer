import React from 'react';
import { Carousel } from 'react-bootstrap';

class Submovie extends React.Component {
  render() {

    return (
      <>
          <Carousel.Caption>
            <p>{this.props.title}</p>
            <p>{this.props.releaseData}</p>
          </Carousel.Caption>
          <img
            alt="the movie poster" 
            src={`https://image.tmdb.org/t/p/original${this.props.poster}`}
            >
          </img>
      </>
    )
  }
}

export default Submovie;