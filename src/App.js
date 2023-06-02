import React from 'react';
import './App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Weather from './components/Weather';
import Movies from './components/Movies'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      cityMap: '',
      weatherData: [],
      movieResults: [],
      lat: '',
      lon: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      // console.log('++++++++++++++++++++++++++++', url);

      let cityDataFromAxios = await axios.get(url)
      // console.log('++++++++++++++++++++++++++++', cityDataFromAxios);

      let lat = cityDataFromAxios.data[0].lat;
      // console.log(lat);
      let lon = cityDataFromAxios.data[0].lon;

      this.setState({lat: cityDataFromAxios.data[0].lat})
      this.setState({lon: cityDataFromAxios.data[0].lon})
console.log('****************', this.state.lat);

      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;


      this.handleGetWeather(lat, lon);
      this.handleGetMovies();

      this.setState({
        cityData: cityDataFromAxios.data[0],
        cityMap: cityMap,
        error: false
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }

  }

  handleGetWeather = async (lat, lon) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`

      let weatherDataFromAxios = await axios.get(url);

      this.setState({
        weatherData: weatherDataFromAxios.data
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }
  }
  handleGetMovies = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`

      let movieDataFromAxios = await axios.get(url);


      this.setState({
        movieResults: movieDataFromAxios.data
        
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }
  }
  render() {
    return (
      <>
        <h1>API Calls</h1>
        <Form onSubmit={this.getCityData}>
          <Form.Group>
            <Form.Label as='form-label'>City Name:</Form.Label>
            <Form.Control type='text' placeholder='City Name' onInput={this.handleInput}></Form.Control>
            <Button type='submit'>Explore!</Button>
          </Form.Group>
        </Form>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`} alt='question'></img>
        {
          this.state.error
            ? <Alert variant="warning">{this.state.errorMessage}</Alert>
            : <Container>
              <ListGroup as='list-group'>
                <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
                <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
                <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
              </ListGroup>
              <Image src={this.state.cityMap}></Image>
            </Container>
        }
        <Weather 
          weatherData={this.state.weatherData}
        />
        <Movies
        movieResults={this.state.movieResults}
        />
      </>
    )
  }
}


export default App;