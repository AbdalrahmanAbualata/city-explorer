import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap/';
import './App.css';
import Weather from './components/Weather';
import Movie from './components/Movie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: '',
      showData: false,
      mapDataS: "",
      key: process.env.REACT_APP_LOCATIONIQ_KEY,
      wetherData: [],
      wetherDataShow: true,
      movieData: [],
      movieDataShow: true
    }
  }

  getMap = async (e) => {
    e.preventDefault();

    await this.setState({
      searchCity: e.target.city.value
    })

    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;

    let resultData = await axios.get(locURL)
    // console.log(resultData);
    this.setState({
      cityData: resultData.data[0],

      showData: true
    })

    try {
      let wetherDataResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/weather?lon=${this.state.cityData.lon}&lat=${this.state.cityData.lat}`)
      // console.log(wetherDataResult);

      wetherDataResult ? this.setState({
        wetherData: wetherDataResult.data,
        wetherDataShow: true,
      })  : this.setState({
        wetherData: [],
        wetherDataShow: false
      })
    } catch (error) {
      this.setState({
        wetherData: [],
        wetherDataShow: false

      })
      // console.log(error);
      alert("no weather data for this city")
    }
    
this.getMovies();
  }

  // *********************************************************************************
  getMovies = async () => {
    try {
      let movieDataResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/movies?cityName=${this.state.searchCity}`);
      // console.log(movieDataResult.data);

      movieDataResult ? this.setState({
        movieData: movieDataResult.data,
        movieDataShow: true,
      }) : this.setState({
        movieData: [],
        movieDataShow: false,
      })

    } catch (error) {
      this.setState({
        movieData: [],
        movieDataShow: false,

      })
      
      console.log(this.state.movieData);
      // console.log(error);
      alert("no movies for this city rigth now ")
    }

  }




  render() {
    return (

      <>
        <div id="bb">
          <h2>City Map</h2>
          <form onSubmit={this.getMap}>
            <input type='text' placeholder='Enter city' name='city' />
            <button>Show Map</button>
          </form>
        </div>
        {this.state.showData &&

          <Card id="card" style={{ width: '40%', padding: "1%", marginTop: "20px" }}>
            <Card.Title><h2>  {this.state.searchCity} </h2></Card.Title>


            <h5 style={{ fontSize: "17px" }}>  Lat : {this.state.cityData.lat} </h5>
            <h5 style={{ fontSize: "17px" }}>  Lon : {this.state.cityData.lon} </h5>
            <Card.Body>
              <img id="dd" style={{
                marginLeft: "10%", width
                  : "80%"
              }} alt="city" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} />
            </Card.Body>
            {this.state.wetherDataShow && this.state.wetherData.map((item, indx) => {

                     
              return (<Weather  key={indx} Date={item.date} description={item.descreption} />);//description =descreption*/
            })

            }
          </Card>
        }

        <div id="main" style={{ width: '95%',alignContent:"space-evenly"}}>
        {this.state.movieDataShow && this.state.movieData.map((movie, indx) => {

          return (<Movie key={indx} avgVote={movie.avgVote} overview={movie.overview}  date={movie.date}   src={movie.src}  title={movie.title}  vote={movie.vote}/>);

        })

        }
        </div>




      </>


    )
  }
}

export default App

