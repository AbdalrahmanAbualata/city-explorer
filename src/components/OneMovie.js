import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap/';

export class OneMovie extends React.Component {

    render() {
        return (
<Card style={{ width: '470px', display: "inline-block" }}>
<Card.Title style={{ textAlign:"center"}}><h2> 🎬{this.props.title} </h2></Card.Title>
<Card.Img style={{ marginLeft: "12.5%", width: "75%", height: "500px" }} variant="top" src={this.props.src} alt="aaaa" />
<Card.Body>
    <p id="favorites"> 🍿overview:{this.props.overview} </p>
    <h3> ⌚ released on: {this.props.date} </h3>
   <h3 className="favorites"> 🗳 total votes:{this.props.vote} </h3>
   <h3 id='dis'> 🎰 average votes :{this.props.avgVote} </h3>

</Card.Body>
</Card>
    )
}
}

export default OneMovie


