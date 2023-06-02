import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Movies.css';
import Submovie from './Submovie'

class Movies extends React.Component {
  render() {

    return (
      <>
        <Carousel slide={false}>
          {this.props.movieResults.map((movie, index) => {
            return (
              <Carousel.Item>
                <Submovie
                  title={movie.title}
                  releaseData={movie.release}
                  poster={movie.poster}
                  key={index}
                />
              </Carousel.Item>
            )
          })}
        </Carousel>
      </>
    )
  }
}

export default Movies;