import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Patientabi from '../abis/Patient.json'
import Navbar from './Navbar'
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
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
  // var net_id=await web3.eth.net.getId()
  var net_id=5777
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
    doctors:[],
    doctors2:[],
    showMe: false,
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
      
        var doc1=await doctor.methods.getall1(i).call()
        var doc2=await doctor.methods.getall2(i).call()
        var doc=[doc1,doc2]
        // this.setState({doctors:[...this.state.doctors,doc,doc2]})
        this.setState({doctors:[...this.state.doctors,doc]})
        console.log((this.state.doctors))
    }
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async selecting(id,key){
  
  this.setState({loading:true})
  var web3 = new Web3(Web3.givenProvider|| "http://localhost:7545")
  var d_abi= Doctorabi.abi
  // var net_id=await web3.eth.net.getId()
  var net_id=5777
  if(Doctorabi.networks[net_id]){
    var address= Doctorabi.networks[net_id].address
    var doctor= web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    console.log(key,Number(id))
    doctor.methods.setp(Number(id),key,Patientabi.networks[net_id].address).send({from:this.state.account}).on('error', function(error){
      NotificationManager.error('Your request was cancelled', 'Doctor not notified!', 5000)
        window.setTimeout(function(){window.location.reload()}, 3000);    
    }).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
     NotificationManager.success('Your prescribtion will be added by doctor', 'Doctor was notified',5000)
      window.setTimeout(function(){window.location.reload()}, 3000);    
    });
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async hist(){
  // var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  
}


async openLink(cityName) {
    var i;
    var x = document.getElementsByClassName("data");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    if(cityName=='history'){
      var key = window.location.href.toString().split("/")[4]
 var x= await this.state.patient.methods.hCount.call()
 if(document.getElementById("dlist").innerHTML==""){
 for(var i=1;i<=x.toString();i++){
   var no= await this.state.patient.methods.viewHist(i,key).call()
   console.log(no)
  
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
    document.getElementById(cityName).style.display = "block";
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
            <div>
              <Navbar account={this.state.account} />
            <div className={this.state.showMe ? "d-flex toggled" : "d-flex"} id="wrapper" >
              
              <NotificationContainer/>
              
              <div className="bg-light border-right" id="sidebar-wrapper" >
                <div className="sidebar-heading">{this.state.info[0]}</div>
                <div className="list-group list-group-flush">
                  <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('dashboard')}>Dashboard</a>
                  <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('appointment')}>Make an Appointment</a>
                  <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('report')}>Reports</a>
                  <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('profile')} >Profile</a>
                  <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('history')} >History</a>
                </div>
              </div>
              <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                  <button className="btn btn-primary" id="menu-toggle" onClick={() => this.setState({showMe: !this.state.showMe})}>Toggle Menu</button>

                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                      <li className="nav-item active">
                        {/* <a className="nav-link" href="#">{this.state.account}</a> */}
                      </li>
                    </ul>
                  </div>
                </nav>
                {this.state.loading 
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                :
                <div>
                  <div className="container-fluid data animate-right" id="dashboard">
                    <h3>Doctors to consult from</h3>
                    <table className="table">
                      <thead>
                        <tr>
                        <th scope="col">Profile</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col"> Specialitist</th>
                        <th scope="col"> Years of Experience</th>
                        <th scope="col">City</th>
                        <th scope="col">Avaliable from</th>
                        <th scope="col">Available till</th>
                        <th scope="col"> selecting</th>
                        </tr>
                      </thead>          
                      <tbody id="doclist">
                        {this.state.doctors.map((doctor,key)=>{
                          return(
                            <tr key={key}>
                            <th scope="row">{doctor[0]._ipfhash ? (
                              <div className="c-doctor-card__photo_col pure-u-1-5">
                            <img
                              height="150" width="150"
                              src={`https://ipfs.io/ipfs/${doctor[0]._ipfhash}`}
                              // className="card-img-top"
                              alt={`${doctor._ipfhash}`}
                            /></div>
                              ) : (
                              <img
                                src="https://api.fnkr.net/testimg/333x180/?text=IPFS"
                                className="card-img-top"
                                alt="NA"
                              />
                              )}</th>
                              <td><b></b> {web3.utils.toUtf8(doctor[0]._name)}</td>
                              <td><b></b> {web3.utils.toUtf8(doctor[0]._spec)}</td>
                              <td><b></b> {web3.utils.toDecimal(doctor[0]._exp)}</td>
                              <td><b></b>{web3.utils.toUtf8(doctor[1].add)}</td>
                              <td><b></b>{web3.utils.toUtf8(doctor[1]._timingfrom)}</td>
                              <td><b></b>{web3.utils.toUtf8(doctor[1]._timingtill)}</td>
                              
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
                  </div>
                  <div className="container-fluid data animate-right" id="appointment" style={{display:"none"}}>
                    <h1>Appointment</h1>
                  </div>
                  <div className="container-fluid data animate-right" id="report" style={{display: "none"}}>
                    <h1>Reports</h1>
                    <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                    <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
                  </div>
                  <div className="container-fluid data animate-right" id="profile" style={{display:"none"}}>
                    <h1>Profile</h1>
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
                      <script>var age=</script>
                    </div>
                  </div>
                  <div className="container-fluid data animate-right" id="history" style={{display: "none"}}>
                    <h1>History</h1>
                     <div className="col text-center" id="box">
                      <table id="dlist"></table>
                    </div>
                  </div>
                </div>
              }
        </div>
      </div>
      </div>);
  }
}

export default PatientView;