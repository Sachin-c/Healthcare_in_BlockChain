import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Collapsible from 'react-collapsible';

import '../../node_modules/react-notifications/lib/notifications.css';
import Navbar from './Navbar'
import { DropdownButton } from 'react-bootstrap';

class DoctorView extends Component {

   componentWillMount(){
   this.loadBlockchainData()
  }
async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const abi= Doctorabi.abi
  const net_id=await web3.eth.net.getId()
  var ret=0 
  if(Doctorabi.networks[net_id]){
    var address= Doctorabi.networks[net_id].address
    var doctor= await web3.eth.Contract(abi,address)
    this.setState({doctor})
    ret = await this.state.doctor.methods.check(this.state.account).call()
    console.log(window.location.href.toString().split("/")[3])
    if(ret>0 & (window.location.href.toString().split("/")[3]!="Doctor_View" | window.location.href.toString().split("/")[4]!=ret)){
        window.location.href="/Doctor_View/"+ret
    }else if(ret==-1){
      window.location.href="/"
    }else{
    this.setState({loading:false})
    var id = window.location.href.toString().split("/")[4]
    const count = await doctor.methods.getall(id).call()
    this.setState({info:count[0]})
    console.log(this.state.info)
    const result=await this.state.doctor.methods.getPlen(id).call()
    var patient= await web3.eth.Contract(Patientabi.abi,Patientabi.networks[net_id].address)
    this.setState({patient})
    for(var i=0;i< result.toString();i++){
      const doc=await doctor.methods.getP(i,id).call()
      this.setState({patients:[...this.state.patients,doc]})
      console.log(this.state.patients)
  }
    if (result.toString()>0){
        this.setState({list:false})  
        }
        else{
          this.setState({list:true})  
    }
    }
  }
  else{
    window.alert("Contract not loaded to blockchain")
  }
  
}
async write(name,age,gender,bg,pid,mname,mtype,edate,sdate,nof,id){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var id = window.location.href.toString().split("/")[4]
  // console.log(pid,id)
  this.state.doctor.methods.WriteMedication(name,age,gender,bg,Number(pid),web3.utils.fromAscii(mname),web3.utils.fromAscii(mtype),web3.utils.fromAscii(sdate),web3.utils.fromAscii(edate),web3.utils.fromAscii(nof),id).send({from:this.state.account}).once('receipt',(receipt)=>{ this.setState({loading:false})}).once("confirmation", function () {
    NotificationManager.success('Prescribtion added', 'Check history',5000)
  }) 
  var p = Number(pid)
  this.setState({p})
}
async ph(key){
  var x= await this.state.patient.methods.hCount.call()
  if(document.getElementById("dlist").innerHTML==""){ 
   for(var i=1;i<=x.toString();i++){
    var no= await this.state.patient.methods.viewHist(i,key).call()
    console.log(no)
    if(no[0]!==""){
      let tableRef = document.getElementById("dlist");
      let newRow = tableRef.insertRow(-1);
      let newCell = newRow.insertCell(0);
      console.log(no)
      newCell.setAttribute("style","padding: 26px; display: inline-block; text-align: center")
      let p=document.createTextNode((no[0]+"  prescribed to have "+no[1]+" from  "+no[2]+" to "+no[3]+" "+no[4]+"times a day").toString());
      newCell.appendChild(p);
    }
   
  }
  }
  else{
    document.getElementById("dlist").innerHTML=""
  }  
  console.log(this.state.patient)
}
async hist(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
   var key = window.location.href.toString().split("/")[4]
  var x= await this.state.doctor.methods.treatCount.call()
  if(document.getElementById("wheel").innerHTML==""){
  for(var i=1;i<=x.toString();i++){
    var no= await this.state.doctor.methods.GetMedicationList(i,key).call()
    if(no[0]!==""){
      let tableRef = document.getElementById("wheel");
      let newRow = tableRef.insertRow(-1);
      let newCell = newRow.insertCell(0);
      newCell.setAttribute("style","padding: 26px; display: inline-block; text-align: center")
      let p=document.createTextNode((no[0]+" was prescribed "+web3.utils.toAscii(no[1])+" as "+web3.utils.toAscii(no[2])+" from  "+ web3.utils.toAscii(no[3])+" to "+web3.utils.toAscii(no[4])+" and "+web3.utils.toAscii(no[5])+ " times a day.").toString());
      newCell.appendChild(p);
    }
  }
}else{
  document.getElementById("wheel").innerHTML=""
}
}
async add(dname,mname,mtype,edate,sdate,nof){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const abi= Patientabi.abi
  const net_id=await web3.eth.net.getId()
  if(Patientabi.networks[net_id]){
    const address= Patientabi.networks[net_id].address
    const patient= await web3.eth.Contract(abi,address)
    this.setState({patient})
    console.log(dname)
    console.log(this.state.p)
    patient.methods.addDoc(dname,mname,sdate,edate,nof,this.state.p).send({from:this.state.account}).once('receipt',(receipt)=>{ this.setState({loading:false})}).once("confirmation", function () {
      NotificationManager.success('Patient got prescribtion', 'Inform Patient',5000)
      window.setTimeout(function(){window.location.reload()}, 3000)    
    }) 

    // var id = window.location.href.toString().split("/")[4]
    // const result=await this.state.doctor.methods.getPlen(id).call()
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true,
    list:true,
    info:'',
    patients:[],
    plist:[]
  }
  this.hist = this.hist.bind(this);

}



  render() {
    const hstyle = {
      display: "block",
      width: "100%",
      border: '3px solid grey',
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
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
                <div>
                  <h2>Requests will be shown below </h2>
                  {this.state.list
                  ?<div> <h3>No requests yet</h3></div>
                 :
                 <ul>
                   
                 {this.state.patients.map((patient,key)=>{
                   return(
                     
                     <li key={key}>
                       <button   onClick={(e) => this.ph(patient[5])} title="View Patient History">View Patient History</button>
                    <table id="dlist">
                    </table>
     
                  <form id="form1" onSubmit={event=>{
                    event.preventDefault()
                    const mname=this.mname.value
                    const mtype=this.mtype.value
                    const sdate=this.sdate.value
                    const edate=this.edate.value
                    const nof=this.nof.value
                    // const doc=this.state.doctor.geta
                    this.write(patient._name,patient._age,patient._gender,patient._bg,patient._pid.toString(),mname,mtype,edate,sdate,nof,key)   
                    this.add(this.state.info,mname,mtype,edate,sdate,nof)
                  }}> <h6 id="print">{patient._name}({patient._age.toString()} years old) is {patient._gender} with blood group {patient._bg} 
                  </h6>
                    {/* { this.setmindate()} */}
                    {/* <p className="text-danger" id="error"></p> */}
                    
                    
                    <div className="form-group">
                            <label htmlFor="Medicine">Medicine</label>
                            <input type="med" className="form-control" required ref={(input) => {this.mname=input}} id="medicine" placeholder="Medicine Name"></input>
                          </div>
                    <div className="form-group"> 
                            <label htmlFor="type">Medicine Type</label>
                        <select  name="type" className="form-control" ref={(input) => {this.mtype=input}} >
                            <option value="Liquid"defaultValue>Liquid</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Capsule">Capsule</option>
                        </select>
                    </div>
                    
                    <div className="form-group" data-provide="datepicker">
                            <label htmlFor="Start Date">Start Date</label><br/>
                            <input type="date" id="ssdate" required ref={(input) => {this.sdate=input}}/>
                    </div>
                           
                    <div className="form-group" data-provide="datepicker">
                        <label htmlFor="Start Date">End Date</label><br/>
                        <input type="date" required ref={(input) => {this.edate=input}}/>
                    </div>

                    <div className="form-group"> 
                            <label htmlFor="type">Number of times a day </label>
                        <select  name="numberof" className="form-control" ref={(input) => {this.nof=input}} >
                            <option defaultValue value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <button id="button" type="submit"  className="btn btn-primary">Submit</button> 
                </form></li>
                   )})}    
                 </ul>  
                }
                <button id="button"  onClick={this.hist} className="btn btn-primary">History</button> 
                <table id="wheel"></table>
                </div>
                
                }
                </div>
           
            </main>
          </div>
        </div>
      </div>
      
    );
  }
}

export default DoctorView;







