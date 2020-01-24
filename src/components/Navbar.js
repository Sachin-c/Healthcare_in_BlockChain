import React, { Component } from 'react';

class Navbar extends Component {

  
  render() {
    return (
        <nav className="navbar navbar-dark  bg-dark flex-md-nowrap p-0 shadow">
        <div
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        ><img src="/logo.png" height="80" width="80"></img>
<<<<<<< HEAD
            Healthcare in BLOCKCHAIN
=======
<<<<<<< HEAD
          Healthcare in BLOCKCHAIN
=======
            Healthcare in BLOCKCHAIN
>>>>>>> b2d173000e6f92bd2529f83583cc513cd2f18d09
>>>>>>> 735b4af18f25b9d0157b7a3f49a5a5e14a963e01
        </div>
        
        <p className="text-white"> {this.props.account}</p>
      </nav>
      
    );
  }
}

export default Navbar;
