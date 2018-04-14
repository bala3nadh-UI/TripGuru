import React from 'react';
var {Route, Router, Redirect, IndexRoute, hashHistory} = require('react-router');
import { RingLoader } from 'react-spinners';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currIndex: 0
    };

    this.go2ActivityPage = this.go2ActivityPage.bind(this);
  }

  go2ActivityPage(id) {
    this.props.history.push({
      pathname: '/activity/'+id,
      state: {
        id: id,
        cityName: this.props.params.cityName
      }
    });
  }

  componentDidMount() {
    let url = "http://tour.api.thetripguru.com/tours?filter[location.url]=" + this.props.params.cityName + "&limit=15&offset=1";
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
    return (
      <div>
        <h1 className='text-center page-title titleStyle'>List of Activities</h1>
        <ul className="user-list">
        {this.state.items.map((user, index) => { 
          let imgSrc = "https://res.cloudinary.com/thetripguru/image/upload/h_160,q_90,w_500/" + user.attributes.media.banners[0].src + ".jpg?w=940&h=650&auto=compress&cs=tinysrgb";
          return (
            <div key={user.id}>
              <div className="wrapper">
                <div className="grid-block medium-push-1 img-container"><img src={imgSrc} alt="" /></div>
                <div className="grid-block align-middle medium-pull-1 card-container">
                  <div className="card">
                    <div className="card-section">
                      <a onClick={() => this.go2ActivityPage(user.id)}>{user.attributes.title} ></a>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          );

        })}
        </ul>

      </div>
    );
    }
  }
}

module.exports = Index;