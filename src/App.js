import React from 'react'
import axios from 'axios';

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
      <div>
        <>
          <h2>City Map</h2>
          <form onSubmit={this.getMap}>
            <input type='text' placeholder='Enter city' name='city' />
            <button>Show Map</button>
          </form>

          {this.state.showData &&
            <div>
              <p>{this.state.searchCity} Lat:{this.state.cityData.lat} /Lon:{this.state.cityData.lon} </p>
              <img alt="city" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} />
            </div>

          }
        </>

      </div>
    )
  }
}

export default App

