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
    showMe: true,

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
      // console.log('Result',result[0].hash);
      const prhash=result[0].hash
      this.setState({loading : true})
      console.log(this.state.buffer)
      var count=  this.state.doctor.methods.doctorCount().call()
     this.state.doctor.methods.set(web3.utils.fromAscii(name),web3.utils.fromAscii(spec),(exp),((add).toString()),web3.utils.fromAscii(timingfrom),web3.utils.fromAscii(timingtill),web3.utils.fromAscii(gender),this.state.account,prhash).send({from: this.state.account}).on('error', function(error){
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
    return (
      <div className="container bootstrap snippet">
        <NotificationContainer/>
        <br/>
        <div className="row">
          <div className="col-sm-10"><h1>Doctor Registration</h1></div>
          <div className="col-sm-2"><img title="profile image" height="150" width="150" className="rounded img-responsive" src="logo.png"/></div>
        </div>
        <hr/>
        <div>
          {this.state.loading 
          ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
          : 
          <div className="row">
            <div className="col-sm-3">          
              <div className="text-center">
              {this.state.showMe
                ? <img src="avatar.png" className="avatar img-circle img-thumbnail" alt="avatar"/>
                : <img 
                    height="150" width="150"
                    src={this.state.file}
                    className="img-thumbnail"
                    alt="Preview"
                    />
                  }
                <h6>Upload a different photo...</h6>
                <input
                  onClick={() => this.setState({showMe: !this.state.showMe})}
                  type="file"
                  className="form-control-file"
                  id="file"
                  onChange={this.captureFile}
                  required
                />
              </div> 
            </div>
            <div className="col-sm-9">
              <div>
                <form className="form" id="registrationForm" onSubmit={this.onSubmit}>
                  <p className="text-danger" id="error"></p>
                  <div className="row">         
                    <div className="col-6">
                      <label htmlFor="Name"><h4>Name</h4></label>
                      <input type="text" className="form-control" id="name" required ref={(input) => {this.pname=input}} placeholder="Enter Name"/>
                    </div>
                    <div className="col-6">
                      <label htmlFor="spec"><h4>Specialization</h4></label>
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
                  <br/>
                  <div className="row">
                  <div className="col-6">
                      <label htmlFor="time"><h4>Available from</h4></label>
                      <input type="time" id="timingfrom" required ref={(input) => {this.timingfrom=input}}/>
                  </div>
                    <div className="col-6">
                      <label htmlFor="time"><h4>Available till</h4></label>
                      <input type="time" id="timingtill" required ref={(input) => {this.timingtill=input}}/>
                    </div>
                  </div>
                  <br/>
                  <div className="row">  
                    <div className="col-6">
                      <label htmlFor="Experience"><h4>Years of Experience</h4></label>
                      <input type="number" className="form-control" id="exp" required ref={(input) => {this.exp=input}} placeholder="Experience" />
                    </div>
                    <div className="col-6">
                      <label htmlFor="Gender"><h4>Gender</h4></label>
                      <select  name="gender" className="form-control" ref={(input) => {this.pgen=input}} >
                        <option value="male"defaultValue>Male</option>
                        <option value="female"defaultValue>Female</option>
                        <option value="others"defaultValue>Others</option>
                      </select>
                    </div>
                  </div>
                  <br/>
                  <div className="form-group">
                    <div className="col-6">
                      <label htmlFor="Address"><h4>City</h4></label>
                      <textarea type="text" className="form-control" id="add" required ref={(input) => {this.add=input}} placeholder="Address"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <br/>
                      <button className="btn btn-lg btn-success" type="submit">Save</button>
                      <button className="btn btn-lg" type="reset">Reset</button>
                    </div>
                  </div>
                </form>
                <hr/>
              </div>
            </div>
          </div>
          }
        </div>
        {/* <TouchableOpacity onPress={() => { onPress('YourPage'); }} n> */}
        {/* <Text> Move</Text> */}
        {/* </TouchableOpacity> */}   
      </div>
    );
  }
}

export default Doctor;
