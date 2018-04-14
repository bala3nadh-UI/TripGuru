var React = require('react');
//require('../styles/main.css');
var {Route, Router, Redirect, IndexRoute, hashHistory} = require('react-router');
import styles from '../styles/main.css';
import { RingLoader } from 'react-spinners';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      imgSrc: "",
      data: {},
      currIndex: 0
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    fetch("http://tour.api.thetripguru.com/tours/" + this.props.location.state.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            title: result.data.attributes.title,
            desc: result.data.attributes.description,
            imgSrc: result.data.attributes.media.banners[0].src
          });
          this.refs.desc.innerHTML = result.data.attributes.description;
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  goHome() {
    this.props.history.push('/city/' + this.props.location.state.cityName);
  }

  render() {
    if(this.state.isLoaded == false){
      return (
      <div className='sweet-loading'>
        <h1 className='text-center page-title titleStyle'>List of Activities</h1>
        <RingLoader
          color={'#123abc'}  
        />
      </div>
      )
    } else {
     let imgSrc = "https://res.cloudinary.com/thetripguru/image/upload/h_160,q_90,w_500/" + this.state.imgSrc + ".jpg?w=940&h=650&auto=compress&cs=tinysrgb";
     return (
      <div key={this.props.location.state.id}>
        <h1 className='text-center page-title titleStyle'>Activity Details</h1>
        <div className="wrapper">
          <div className="grid-block medium-push-1 img-container"><img src={imgSrc} alt="" /></div>
          <div className="grid-block align-middle medium-pull-1 card-container">
            <div className="card">
              <div className="card-section">
                <a>{this.state.title} ></a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <p className='textStyle' ref="desc">Description: {this.state.desc}</p> 
        <input type="button" className="button" onClick={this.goHome} value="Back to Activities" />
      </div>
    );
    }
  }
}

module.exports = Activity;
