import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
import Navbar from './Navbar'
// import { callExpression } from '@babel/types';
// import routing from './../index'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../../node_modules/react-notifications/lib/notifications.css';
class Doctor extends Component {

   componentWillMount(){
   this.loadBlockchainData()
    
  }


async loadBlockchainData(){
  
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const abi= Doctorabi.abi
  var net_id = 5777
  var ret=0    
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
  if(Doctorabi.networks[net_id]){
    const address= Doctorabi.networks[net_id].address
    const doctor= await web3.eth.Contract(abi,address)
    this.setState({doctor})
    this.setState({loading:false})
    const count = await doctor.methods.doctorCount.call()
    console.log(count);
    console.log(this.state.account) 
    // await this.state.doctor.methods.get().call().then(function(number){ console.log(number)});
    
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
   if(age<=0)
  {
    NotificationManager.warning('Please enter a valid age','Incorrect age', 3000);
  }
  else{
    this.setState({loading : true})
    var count= await this.state.doctor.methods.doctorCount().call()
   this.state.doctor.methods.set(name,age,gender,this.state.account).send({from: this.state.account}).on('error', function(error){
    NotificationManager.error('Doctor account not created', 'Transaction cancelled!', 5000)
      window.setTimeout(function(){window.location.reload()}, 3000);    
  }).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
    count =Number(count)+Number(1)
    window.location.href="/Doctor_View/"+count.toString()
   
})
}
   
}
  render() {
   
    return (
      
      <div>
        <NotificationContainer/>
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
                                <input type="text" className="form-control" id="name" required ref={(input) => {this.pname=input}} placeholder="Enter Name"></input>
                              </div>
                              <div className="form-group">
                                <label htmlFor="Age">Age</label>
                                <input type="number" className="form-control" id="age" required  ref={(input) => {this.page=input}} placeholder="Age"></input>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="Gender">Gender</label>
                                  <select  name="gender" className="form-control" ref={(input) => {this.pgen=input}} >
                                    <option value="male"defaultValue>Male</option>
                                    <option value="female"defaultValue>Female</option>
                                    <option value="others"defaultValue>Others</option>
                                </select>
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
