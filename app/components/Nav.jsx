var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({

  render: function(){
    return(

      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Trip Guru</li>
          </ul>
        </div>
      </div>

    );
  }
});

module.exports = Nav;
