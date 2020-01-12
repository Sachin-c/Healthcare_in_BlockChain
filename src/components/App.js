import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'


class App extends Component {
   componentWillMount(){
   this.loadBlockchainData()   
  }

async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider||  "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  console.log(web3)
  this.setState({account:accounts[0]})  
  // this.setState({account:web3})
}
constructor(props){
  super(props)
  this.state={
    account:''
  }
}
  render() {
    return (
      <div>
       <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto"> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="/Patient"><button type="button" className="btn btn-primary" >Patient</button></a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="/Doctor"><button type="button" className="btn btn-primary" >Doctor</button></a>
                    
              </div>
            </main>
          </div>
        </div>
      </div>
      // <div>
      //   <h1>Home</h1>
      // </div>
    );
  }
}

export default App;
