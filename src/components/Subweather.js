import React from 'react';
import { Card } from 'react-bootstrap';

class Submovie extends React.Component {
  render() {

    return (
      <>
            <Card.Text>{this.props.date}</Card.Text>
            <Card.Text>{this.props.description}</Card.Text>
      </>
    )
  }
}

export default Submovie;