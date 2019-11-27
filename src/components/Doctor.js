import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Doctorabi from '../abis/Doctor.json'
import Navbar from './Navbar'
// import { callExpression } from '@babel/types';
// import routing from './../index'
class Doctor extends Component {

   componentWillMount(){
   this.loadBlockchainData()
    
  }


async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const abi= Doctorabi.abi
  const net_id=await web3.eth.net.getId()
  if(Doctorabi.networks[net_id]){
    const address= Doctorabi.networks[net_id].address
    const doctor= await web3.eth.Contract(abi,address)
    this.setState({doctor})
    this.setState({loading:false})
    const count = await doctor.methods.doctorCount.call()
    console.log(count);
    console.log(this.state.doctor.abiModel.abi.methods) 
    await this.state.doctor.methods.get().call().then(function(number){ console.log(number)});
    
  }else{
    window.alert("Contract not loaded to blockchain")
  }
  
}
constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true
  }
  this.set=this.set.bind(this);

}


async set(name,age,gender){
  this.setState({loading : true})
    var count= await this.state.doctor.methods.doctorCount().call()
   this.state.doctor.methods.set(name,age,gender).send({from: this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
    count =Number(count)+Number(1)
    window.location.href="/Doctor_View/"+count.toString()
 
});
  
   
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
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                : 
                                  <form id="form1"  onSubmit={event=>{
                                    event.preventDefault()
                                    const name=this.pname.value
                                    const age=this.page.value
                                    const gender=this.pgen.value                                    
                                    this.set(name,age,gender)   
                                  }}>
                                <p className="text-danger" id="error"></p>
                              <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input type="text" className="form-control" id="name" ref={(input) => {this.pname=input}} placeholder="Enter Name"></input>
                              </div>
                              <div className="form-group">
                                <label htmlFor="Age">Age</label>
                                <input type="number" className="form-control" id="age" ref={(input) => {this.page=input}} placeholder="Age"></input>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="Gender">Gender</label>
                                  <input type="text" className="form-control" id="gender" ref={(input) => {this.pgen=input}} placeholder="Gender"></input>
                              </div>                          

                              <button id="button" type="submit"  className="btn btn-primary">Submit</button> 
                           </form>      
                    
  }
                 {/* <TouchableOpacity onPress={() => { onPress('YourPage'); }} n> */}
                  {/* <Text> Move</Text> */}
                {/* </TouchableOpacity> */}
              </div>
            </main>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Doctor;
