import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-dark  bg-dark flex-md-nowrap p-0 shadow ">
          <h2 className="text-light ">Healthcare in BlockChain</h2>
          <p className="text-light"> {this.props.account}</p>
      </nav>  
    );
  }
}

export default Navbar;
