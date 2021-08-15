import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap/';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: '',
      showData: false,
      mapDataS: "",
      key: process.env.REACT_APP_LOCATIONIQ_KEY
    }
  }

  getMap = async (e) => {
    e.preventDefault();

    await this.setState({
      searchCity: e.target.city.value
    })

    console.log('rrrrrrrrrrrrr', process.env.REACT_APP_LOCATIONIQ_KEY)
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;

    let resultData = await axios.get(locURL)

    this.setState({
      cityData: resultData.data[0],

      showData: true
    })

    console.log('aaaaaaaa', this.state.cityData)

  }

  render() {
    return (
    
        <>
        <div id="bb">
          <h2>City Map</h2>
          <form  onSubmit={this.getMap}>
            <input type='text' placeholder='Enter city' name='city' />
            <button>Show Map</button>
          </form>
          </div>
          {this.state.showData &&
              
        <Card id="card"  style={{ width: '40%', padding:"10px" ,marginTop:"20px" }}>
          <Card.Title><h2>  {this.state.searchCity} </h2></Card.Title>
          

          <h5 style={{fontSize:"17px"}}>  Lat : {this.state.cityData.lat} </h5>
          <h5 style={{fontSize:"17px"}}>  Lon : {this.state.cityData.lon} </h5>
          <Card.Body>
          <img  id="dd" style={{ marginLeft:"10%",width
          :"80%"}} alt="city" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`}  />
          </Card.Body>
        </Card>
     
          }
          
        </>


    )
  }
}

export default App

