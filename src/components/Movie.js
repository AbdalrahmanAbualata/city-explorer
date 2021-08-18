import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css';
import OnwMovie from './OneMovie'
export class Movie extends React.Component {




    render() {
        return (

            <div className='apples'>
<OnwMovie title={this.props.title} avgVote={this.props.avgVote} overview={this.props.overview}  date={this.props.date}   src={this.props.src}  vote={this.props.vote} />
            </div>
        )
    }
}

export default Movie





