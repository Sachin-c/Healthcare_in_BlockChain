import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Patientabi from '../abis/Patient.json'
import Navbar from './Navbar'
import Doctorabi from '../abis/Doctor.json'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../../node_modules/react-notifications/lib/notifications.css';

// import ReactNotification from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
// import { store } from 'rc-notifications/react-notification-component';


class PatientView extends Component {

   componentWillMount(){
   this.loadBlockchainData()
    this.getdoctors()

  }


async loadBlockchainData(){
  var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  this.setState(web3)
  var accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
    var et=0
  var abi= Patientabi.abi
  var net_id=await web3.eth.net.getId()
    if(Patientabi.networks[net_id]){
      var address= Patientabi.networks[net_id].address
      var patient= await web3.eth.Contract(abi,address)
      this.setState({patient})
      et = await this.state.patient.methods.check(this.state.account).call()
      console.log(et.toString())
      if(et>0 & (window.location.href.toString().split("/")[3]!="Patient_View" | window.location.href.toString().split("/")[4]!=et)){
        window.location.href="/Patient_View/"+et
    }else if( et==-1){
      window.location.href="/"
    }
    else{
    this.setState({loading:false})
    var id = window.location.href.toString().split("/")[4]
    this.setState({id})
    var p=await this.state.patient.methods.getall1(id).call();
    var t=await this.state.patient.methods.getall2(id).call();
    console.log(t)
    this.setState({
      info:p,
      info2:t
    })    
    document.getElementById('age').innerHTML=(this.state.info[1]).toString();
    }
  }
else{
    window.alert("Contract not loaded to blockchain")
  }
  
}
constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true,
    info:'',
    doctors:[]
  }
  this.hist = this.hist.bind(this);

}
async getdoctors()
{
  var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var abi= Doctorabi.abi
  var net_id = 5777
  if(Doctorabi.networks[net_id]){
    var address= Doctorabi.networks[net_id].address
    var doctor= web3.eth.Contract(abi,address)
    
    var count = await doctor.methods.doctorCount.call()
    for(var i=1;i<= count;i++){
        var doc=await doctor.methods.getall1(i).call()
        console.log(doc)
        this.setState({doctors:[...this.state.doctors,doc]})
        
    }
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async selecting(id,key){
  
  this.setState({loading:true})
  var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var d_abi= Doctorabi.abi
  const net_id=await web3.eth.net.getId()
  if(Doctorabi.networks[net_id]){
    var address= Doctorabi.networks[net_id].address
    var doctor= web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    console.log(key,Number(id))
    this.state.doctor.methods.setp(Number(id),key,Patientabi.networks[net_id].address).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
     NotificationManager.success('Your prescribtion will be added by doctor', 'Doctor was notified',5000)
      window.setTimeout(function(){window.location.reload()}, 3000);    
    });
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async hist(){
  // var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var key = window.location.href.toString().split("/")[4]
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
}else{
  document.getElementById("dlist").innerHTML=""
}
}

// createNotification = (type) => {
//   return () => {
//     switch (type) {
//       case 'info':
//         NotificationManager.info('Info message');
//         break;
//       case 'success':
//         NotificationManager.success('Your prescribtion will be added by doctor', 'Doctor was notified');
//         break;
//       case 'warning':
//         NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
//         break;
//       case 'error':
//         NotificationManager.error('Error message', 'Click me!', 5000, () => {
//           alert('callback');
//         });
//         break;
//       default:break;

//     }
//   };
// };

  render() {  var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")

    return (
       
      <div id="big-banner" >
        <NotificationContainer/>
       <Navbar account={this.state.account} />
          <div className="">
                {this.state.loading 
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                :
                <div className="">
                  <div id="box">
                    <h1 className="text-center">Your Bio</h1>
                    <div className="row">
                      <div className="col-sm-6">
                        <h4 > Name : </h4>
                      </div>
                      <div className="col-sm-6">
                        <h4 id="name" >{this.state.info[0]}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <h4 > Age : </h4>
                      </div>
                      <div className="col-sm-6">
                        <h4 id="age"></h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <h4 > Gender : </h4>
                      </div>
                      <div className="col-sm-6">
                        <h4 id="gender">{this.state.info[2]}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <h4 > Blood Group : </h4>
                      </div>
                      <div className="col-sm-6">
                        <h4 id="bg" >{this.state.info[3]}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <h4 > Allergies:</h4>
                      </div>
                      <div className="col-sm-6">
                        <h4 id="bg" >{this.state.info2}</h4>
                      </div>
                    </div>
                </div>
                

                <br/>
                <div id="box">
                  <h3>Doctors to consult from</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Profile</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col"> Specialitist</th>
                        <th scope="col"> Years of Experience</th>
                        <th scope="col"> selecting</th>
                      </tr>
                    </thead>          
                    <tbody id="doclist">
                      {this.state.doctors.map((doctor,key)=>{
                        return(
                          <tr key={key}>
                            <th scope="row">{doctor._ipfhash ? (
                              <div class="c-doctor-card__photo_col pure-u-1-5">
                <img
                
                  src={`https://ipfs.io/ipfs/${doctor._ipfhash}`}
                  className="card-img-top"
                  alt={`${doctor._ipfhash}`}
                /></div>
              ) : (
                <img
                  src="https://api.fnkr.net/testimg/333x180/?text=IPFS"
                  className="card-img-top"
                  alt="NA"
                />
              )}</th>
                              <td><b></b> {web3.utils.toUtf8(doctor._name)}</td>
                              <td><b></b> {web3.utils.toUtf8(doctor._spec)}</td>
                              <td><b></b> {web3.utils.toDecimal(doctor._exp)}</td>
                              
                              <td>
                                <button className="btn btn-primary"
                                  onClick={()=> {
                                    // console.log(this.state.id,key);
                                    this.selecting(this.state.id,key+1);
                                    }
                                  }
                                >Select</button>
                              </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className="text-center">
                    <button id="button" onClick={this.hist} className="btn btn-primary">See History</button>
                  </div>
                  <table id="dlist"></table>
                  </div>
                </div>
                }
                </div>
          </div>
    );
  }
}

export default PatientView;