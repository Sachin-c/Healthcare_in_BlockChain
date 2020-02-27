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
// const ipfsClient = require('ipfs-http-client')
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host:'ipfs.infura.io',port: '5001',  protocol: 'https' });

 class Doctor extends Component {

   componentWillMount(){
   this.loadBlockchainData()
    
  }


async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const net_id=await web3.eth.net.getId()
  var ret=0    
  if(Doctorabi.networks[net_id]){
    const d_abi= Doctorabi.abi
    var address= Doctorabi.networks[net_id].address
    var doctor= await web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    ret = await this.state.doctor.methods.check(this.state.account).call()
    //console.log(ret.toString())
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
if(!Patientabi.networks[net_id] && !Doctorabi.networks[net_id]){
    window.alert("Contract not loaded to blockchain")
  }
  
}
constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true,
    file: null,
    buffer:null,
    prhash:null,
    

  }
  this.set=this.set.bind(this);

}
// "QmPgCvyRHcXe8dCPNVWYL9FNNkwgGvFUyBtPE8gQdFNKC9"
onSubmit=(event)=>{
  event.preventDefault()
  // ipfs.add(this.state.buffer, (err, result) => {
  //   console.log('Rsult',result);
  //   this.setState({prhash:result})
  // })
  
  const name=this.pname.value
  const gender=this.pgen.value   
  const exp=this.exp.value
  const add=this.add.value
  const spec=this.spec.value
  const timingfrom=this.timingfrom.value
  const timingtill=this.timingtill.value                  
  this.set(name,spec,gender,exp,add,timingfrom,timingtill)   
}
 captureFile=(event)=>{
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    this.setState({
      buffer: Buffer(reader.result),
      file: URL.createObjectURL(file)
    })
  }
}

async set(name,spec,gender,exp,add,timingfrom,timingtill){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
   if(exp<=0)
  {
    NotificationManager.warning('Please enter valid year of experience','Incorrect number', 3000);
  }
  else{
     ipfs.add(this.state.buffer, (err, result) => {
      console.log('Result',result[0].hash);
      const prhash=result[0].hash
      this.setState({loading : true})
      console.log(this.state.buffer)
      var count=  this.state.doctor.methods.doctorCount().call()
     this.state.doctor.methods.set(web3.utils.fromAscii(name),web3.utils.fromAscii(spec),(exp),web3.utils.fromAscii((add).toString()),web3.utils.fromAscii(timingfrom),web3.utils.fromAscii(timingtill),web3.utils.fromAscii(gender),this.state.account,prhash).send({from: this.state.account}).on('error', function(error){
      NotificationManager.error('Doctor account not created', 'Transaction cancelled!', 5000)
        window.setTimeout(function(){window.location.reload()}, 3000);    
    }).on('receipt',(receipt)=>{ this.setState({loading:false})
    this.setState({prhash:result[0].hash})}).on("confirmation", function () {
     
      count =Number(count)+Number(1)
      window.location.href="/Doctor_View/"+count.toString()
     
  })
      return
    })
   
}
   
}
  render() {
   
    return (<div>
      <div id="big-banner"></div>
        <NotificationContainer/>
       <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {this.state.loading 
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                : 
                
                                  <form id="box" onSubmit={this.onSubmit}>
                                
                                <p className="text-danger" id="error"></p>
                                <div className="row" >
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Name">Name:</label>
                                  </div>
                                  <div className="col-sm-8">
                                    <input type="text" className="form-control" id="name" required ref={(input) => {this.pname=input}} placeholder="Enter Name"></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="spec">Specialization:</label>
                                  </div>
                                  <div className="form-group col-sm-8">
                                    <select  name="spec" className="form-control" ref={(input) => {this.spec=input}} >
                                      <option value="Dentist"defaultValue>Dentist</option>
                                      <option value="Gynecologist">Gynecologist</option>
                                      <option value="Obstetrician">Obstetrician</option>
                                      <option value="General Physician">General Physician</option>
                                      <option value="Dermatologist">Dermatologist</option>
                                      <option value="Ear-nose-throat (ent) Specialist">Ear-nose-throat (ent) Specialist</option>
                                      <option value="Homoeopath">Homoeopath</option>
                                      <option value="Ayurveda">Ayurveda</option>
                                      
                                    </select>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Experience">Years of Experience:</label>
                                  </div>
                                  <div className="form-group col-sm-8">  
                                    <input type="number" className="form-control" id="exp" required ref={(input) => {this.exp=input}} placeholder="Experience"></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Address">City:</label>
                                  </div>
                                  <div className="form-group col-sm-8">  
                                    <textarea type="text" className="form-control" id="add" required ref={(input) => {this.add=input}} placeholder="Address"></textarea>
                                  </div>
                                </div>
                                
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="time">Available  from:</label>
                                  </div>
                                  <div className="form-group col-sm-8">  
                                    <input type="time" id="timingfrom" required ref={(input) => {this.timingfrom=input}}/>                                  
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="time">Available till:</label>
                                  </div>
                                  <div className="form-group col-sm-8">  
                                    <input type="time" id="timingtill" required ref={(input) => {this.timingtill=input}}/>                                  
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Gender">Gender</label>
                                  </div>
                                  <div className="form-group col-sm-8">
                                    <select  name="gender" className="form-control" ref={(input) => {this.pgen=input}} >
                                      <option value="male"defaultValue>Male</option>
                                      <option value="female"defaultValue>Female</option>
                                      <option value="others"defaultValue>Others</option>
                                    </select>
                                  </div>
                                </div> 
                                <div className="row">      
                                <div className="form-group col-sm-4">
                                  <label htmlFor="file">Choose a profile photo</label>
                                </div>
                                <div className="form-group col-sm-8">
                                  <input
                                    type="file"
                                    className="form-control-file"
                                    id="file"
                                    onChange={this.captureFile}
                                    required
                                  />
                                  </div>    
                                  </div> 
                                  {this.state.file && (
                                    <div className="text-center mt-3 mb-3">
                                      <img
                                        src={this.state.file}
                                        className="img-thumbnail"
                                        alt="Preview"
                                      />
                                    </div>
                                  )}              
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
