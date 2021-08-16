import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap/';
import './App.css';
import Weather from './Weather';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: '',
      showData: false,
      mapDataS: "",
      key: process.env.REACT_APP_LOCATIONIQ_KEY,
      wetherData:[],
      wetherDataShow:true
    }
  }

  getMap = async (e) => {
    e.preventDefault();

    await this.setState({
      searchCity: e.target.city.value
    })

    // console.log('rrrrrrrrrrrrr', process.env.REACT_APP_LOCATIONIQ_KEY)
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;

    let resultData = await axios.get(locURL)

    this.setState({
      cityData: resultData.data[0],

      showData: true
    })
 // localhost:5001/weather?cityName=seattle
//  let wetherDataResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/weather?cityName=${this.state.searchCity}`)
//  console.log(wetherDataResult);
//  await this.setState({

//   wetherData : wetherDataResult.data,
//  })
 try {
  let wetherDataResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/weather?cityName=${this.state.searchCity}`)
  console.log(wetherDataResult);

  wetherDataResult ? this.setState({
     wetherData : wetherDataResult.data,
     wetherDataShow:true,
  }) : this.setState({
    wetherData: [],
    wetherDataShow:false
  })

} catch (error) {
  this.setState({
    wetherData: [],
    wetherDataShow:false
    
  })
  console.log(error);
  alert("no weather data for this city plz try (seattle ,paris, amman)" )
}

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
          { this.state.wetherDataShow   &&  this.state.wetherData.map((item,indx)=>{

console.log(item);
            return( <Weather key={indx} Date={item.date} description={item.descreption}/>);//description =descreption*/
        })
        
      }
        </Card>
     
          }
            
         
          
         
          
        </>


    )
  }
}

export default App

