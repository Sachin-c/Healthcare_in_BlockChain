import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
class App extends Component {
   componentWillMount(){
     
   this.loadBlockchainData()   
  
  }

async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider)
  const accounts = await web3.eth.getAccounts()
  console.log(web3)
  
  this.setState({account:accounts[0]})  
  var net_id = 5777
  // await web3.eth.net.getId()
  var ret=0    
  if(Doctorabi.networks[net_id]){
    const d_abi= Doctorabi.abi
    var address= Doctorabi.networks[net_id].address
    var doctor= await web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    ret = await this.state.doctor.methods.check(this.state.account).call()
    // console.log(ret.toString())
    if(ret>0){
        window.location.href="/Doctor_View/"+ret
    }
  }
  if(Patientabi.networks[net_id]){
    console.log(this.state.account)
    const p_abi= Patientabi.abi
    address= Patientabi.networks[net_id].address
    const patient= await web3.eth.Contract(p_abi,address)
    this.setState({patient})
    ret = await this.state.patient.methods.check(this.state.account).call()
    console.log(ret)
    if(ret>0){
      window.location.href="/Patient_View/"+ret
  }else{
  this.setState({loading:false})
  }
}

}
constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true
  }
}
  render() {
    return (
      <div id="big-banner" >
        <div>
          <Navbar account={this.state.account} />
        </div>
        <div>
          {this.state.loading 
            ? <div id="loader" class="col-text-center"><h1 className="text-center">Loading..</h1></div>
            : 
            <div className="row">
              <div className="col-sm-6">
                <p></p>
                                <a  href="/Patient"><button type="button" className="btn btn-default btn-outline-primary btn-sm" ><img src="/pat.png" height="50%" width="50%" ></img></button></a>
              </div>
              <div className="col-sm-6">
                <p></p>
                <a  href="/Doctor"><button type="button" className="btn btn-default btn-outline-primary btn-sm" ><img src="/pic.png" height="50%" width="50%" ></img></button></a>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
