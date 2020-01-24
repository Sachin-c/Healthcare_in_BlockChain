import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
<<<<<<< HEAD
=======

>>>>>>> b2d173000e6f92bd2529f83583cc513cd2f18d09


class App extends Component {
   componentWillMount(){
     
   this.loadBlockchainData()   
  
  }

async loadBlockchainData(){
<<<<<<< HEAD
  var net_id = 5777
  const web3 = new Web3(Web3.givenProvider||  "http://localhost:7545")
=======
  const web3 = new Web3(Web3.givenProvider)
>>>>>>> b2d173000e6f92bd2529f83583cc513cd2f18d09
  const accounts = await web3.eth.getAccounts()
  console.log(web3)
  
  this.setState({account:accounts[0]})  
<<<<<<< HEAD
  var ret=0 
  if(this.state.account==undefined){
    alert("Sign in to your blockchain wallet through metamask");
  } 
  else{  
=======
  var net_id = 5777
  // await web3.eth.net.getId()
  var ret=0    
>>>>>>> b2d173000e6f92bd2529f83583cc513cd2f18d09
  if(Doctorabi.networks[net_id]){
    const d_abi= Doctorabi.abi
    var address= Doctorabi.networks[net_id].address
    var doctor= await web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    ret = await this.state.doctor.methods.check(this.state.account).call()
    console.log(ret.toString())
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
<<<<<<< HEAD
}
  // this.setState({account:web3})
=======

 
  
>>>>>>> b2d173000e6f92bd2529f83583cc513cd2f18d09
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
      <div>
       <Navbar account={this.state.account} />
      
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto"> 
              {this.state.loading 
<<<<<<< HEAD
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading<span id="wait">.</span>
                </h1></div>
                : 
                
=======
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                : 
>>>>>>> b2d173000e6f92bd2529f83583cc513cd2f18d09
                <div>
                    <a  href="/Patient"><button type="button" className="btn btn-primary" >Patient</button></a>
                    <a  href="/Doctor"><button type="button" className="btn btn-primary" >Doctor</button></a>
                    </div>
              }
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
