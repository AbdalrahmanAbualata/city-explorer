import React from 'react'

export class Weather extends React.Component {
    render() {
        return (
            <div>
               <p>date : {this.props.Date}</p>
               <p>description: {this.props.description}</p>
            </div>
        )
    }
}

export default Weather

