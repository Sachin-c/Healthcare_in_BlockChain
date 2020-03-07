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
import { ImageGroup, Image } from 'react-fullscreen-image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import ReactNotification from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
// import { store } from 'rc-notifications/react-notification-component';

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host:'ipfs.infura.io',port: '5001',  protocol: 'https' });
const images = [
  'https://unsplash.com/photos/Bkci_8qcdvQ',
  'https://unsplash.com/photos/hS46bsAASwQ',
  'https://unsplash.com/photos/2VDa8bnLM8c',
  'https://unsplash.com/photos/_LuLiJc1cdo',
  'https://unsplash.com/photos/1Z2niiBPg5A',
  'https://unsplash.com/photos/pHANr-CpbYM',
  'https://unsplash.com/photos/pQMM63GE7fo',
  'https://unsplash.com/photos/2VDa8bnLM8c',
  'https://unsplash.com/photos/MBkQKiH14ng',
]
class PatientView extends Component {

   componentWillMount(){
   this.loadBlockchainData()
    this.getdoctors()
    // this.getrep()
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
    a:[0],
    showMe: false,
    buffer:null,
    prhash:null,
    rep:[],
  }
  this.hist = this.hist.bind(this);

}
printDocument() {
  const input = document.getElementById('dlist');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    })
  ;
}
async getdoctors()
{
  var web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var abi= Doctorabi.abi
  var net_id = 5777
  if(Doctorabi.networks[net_id]){
    var address= Doctorabi.networks[net_id].address
    var doctor= web3.eth.Contract(abi,address)
    this.setState({doctor})
    var id = window.location.href.toString().split("/")[4]
    var count = await doctor.methods.doctorCount.call()
    for(var i=1;i<= count;i++){var c=(await doctor.methods.checkwait(Number(i),(id)).call()); if(c==1){var d= true}else{var d=false}
      this.setState({a:[...this.state.a,d]})
        var doc1=await doctor.methods.getall1(i).call()
        var doc2=await doctor.methods.getall2(i).call()
        var doc=[doc1,doc2]
        // this.setState({doctors:[...this.state.doctors,doc,doc2]})
        this.setState({doctors:[...this.state.doctors,doc]})
        var c=await doctor.methods.checkwait(1,2).call()
        console.log(c)
    } console.log(this.state.doctors)
  }else{
    window.alert("Contract not loaded to blockchain")
  }
  var abi= Patientabi.abi
  var net_id=5777
      var address= Patientabi.networks[net_id].address
  var patient= await web3.eth.Contract(abi,address)
    this.setState({patient})
  var id = window.location.href.toString().split("/")[4]
  var len=await this.state.patient.methods.replen(id).call()
  // console.log(len)

  for(var w=0;w<len;w++)
  {
    var dd= await this.state.patient.methods.viewrep(id,w).call()
    this.setState({rep:[...this.state.rep,dd]})
  }
console.log(this.state.rep)
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

async addrep(name){
 
   console.log("here")
     ipfs.add(this.state.buffer, (err, result) => {
      console.log('Result',result[0].hash);
      const prhash=result[0].hash
      this.setState({loading : true})
      console.log(this.state.buffer)
      var key = window.location.href.toString().split("/")[4]
     this.state.patient.methods.addrep(key,name,prhash).send({from: this.state.account}).on('error', function(error){
      NotificationManager.error('File not uploaded', 'File upload cancelled', 5000)
        window.setTimeout(function(){window.location.reload()}, 3000);    
    }).on('receipt',(receipt)=>{ this.setState({loading:false})
    this.setState({prhash:result[0].hash})}).on("confirmation", function () {
      NotificationManager.success('Report uploaded successfully', 'Report added', 5000)
      window.setTimeout(function(){window.location.reload()}, 2000);    
  })
      return
    })
   

}
async openLink(cityName) {
    var i;
    var x = document.getElementsByClassName("data");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    if(cityName=='history'){
      var web3 = new Web3(Web3.givenProvider|| "http://localhost:7545")
      var key = window.location.href.toString().split("/")[4]
 var x= await this.state.patient.methods.hCount.call()
 console.log(x)
//  if(document.getElementById("dlist").innerHTML==""){
 for(var i=1;i<=x;i++){
   var no= await this.state.patient.methods.viewHist1(i,key).call()
   console.log(no)
   var no2= await this.state.patient.methods.viewHist2(i,key).call()
   console.log(no2)
  //  (string  _dname,string[] _medicine,string _test, bytes32 _sdate,bytes32[] memory _edate,bytes32[] memory _nof,uint _hCount)
  //   (string memory _summ,bytes32[] memory _typ)
     let tableRef = document.getElementById("dlist");
     let newRow = tableRef.insertRow(-1);
     let newCell = newRow.insertCell(0);
     console.log(no,no2)
     if(no[0]!="")
{
     newCell.setAttribute("style","padding: 26px; text-align: left")
     let a=document.createTextNode(("Name: "+web3.utils.toUtf8(no[0])).toString())
      let c=document.createTextNode((" Treatment details:").toString())
      if(no[1].length>1)
      {
      var s1="Medicines prescribed to take are: ".toString()
      }
      else{
        var s1="Medicine prescribed to take is: ".toString()
      }
      console.log(no[1].length);
      for (var j=0;j<no[1].length;j++)
      {
        s1=s1+((no[1][j])+" as "+web3.utils.toUtf8(no2[1][j])+" till "+web3.utils.toUtf8(no[4][j])+" , "+web3.utils.toUtf8(no[5][j])+" times a day. ")
      }
      let e=document.createTextNode(s1)
      let f=document.createTextNode(("Tests suggested:  "+(no[2])).toString())
      let d=document.createTextNode(("Treatment Date: "+web3.utils.toUtf8(no[3])).toString())
      let g=document.createTextNode(("Summary of treatment: "+(no2[0])).toString())
      let h=document.createTextNode(("").toString())
      newCell.appendChild(document.createElement("hr"));
      newCell.appendChild(a);
      newCell.appendChild(document.createElement("br"));
      newCell.appendChild(c);
      newCell.appendChild(document.createElement("br"));
      newCell.appendChild(d);
      newCell.appendChild(document.createElement("br"));
      newCell.appendChild(e);
      newCell.appendChild(document.createElement("br"));
      newCell.appendChild(f);
      newCell.appendChild(document.createElement("br"));
      newCell.appendChild(g);
      newCell.appendChild(document.createElement("br"));
      newCell.appendChild(h);
    }
   }
//  }
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
onSubmit=(event)=>{
  event.preventDefault()
  // ipfs.add(this.state.buffer, (err, result) => {
  //   console.log('Rsult',result);
  //   this.setState({prhash:result})
  // })
  
  
  const repname=this.repname.value                  
  this.addrep(repname)   
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
  render() {  
    var web3 = new Web3(Web3.givenProvider|| "http://localhost:7545")

    return (
            <div>
            <div className={this.state.showMe ? "d-flex toggled" : "d-flex"} id="wrapper" >
              
              <NotificationContainer/>
              
              <div className="bg-light border-right" id="sidebar-wrapper" ref="wrap">
                <div className="sidebar-heading">{this.state.info[0]}</div>
                <div className="list-group list-group-flush">
                  {/* <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('dashboard')}>Dashboard</a> */}
                  <a  className="list-group-item list-group-item-action bg-light tablink" type="button" onClick={(e) => this.openLink('dashboard')}>Make an Appointment</a>
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
                        <a className="nav-link" href="#">{this.state.account}</a>
                      </li>
                    </ul>
                  </div>
                </nav>
                {this.state.loading 
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                :
                <div id="history1">
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
                          console.log(doctor)
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
                              <td><b></b>{(doctor[1].add)}</td>
                              <td><b></b>{web3.utils.toUtf8(doctor[1]._timingfrom)}</td>
                              <td><b></b>{web3.utils.toUtf8(doctor[1]._timingtill)}</td>
                              
                              <td>{this.state.a[key+1]
                              ? <div> <button className="btn btn-primary"
                              onClick={()=> {
                              // console.log(this.state.id,key);
                              this.selecting(this.state.id,key+1);
                              }
                              }
                            >Select</button></div>
                             :
                           <button type="button" class="btn  btn-primary" disabled>Already selected</button>
                              }
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
                    <hr>
                    </hr>
                    <h3> Upload a report</h3>
                    <div className="card">
                      <form onSubmit={this.onSubmit}> 
                        <div className="row">         
                          <div className="col-6">
                            <label htmlFor="Name"><h5>Report of</h5></label>
                            <input type="text" className="form-control" id="name" required ref={(input) => {this.repname=input}} placeholder="Enter Name"/>
                          </div>
                          </div>
                          <div className="row">         
                          <div className="col-6">
                            <label htmlFor="Name"><h5>Upload Report</h5></label>
                            <input
                              // onClick={() => this.setState({showMe: !this.state.showMe})}
                              type="file"
                              className="form-control-file"
                              id="file"
                              onChange={this.captureFile}
                              required
                            />                          
                            </div>
                          </div>                      
                          <button className="btn btn-lg btn-success" type="submit">Save</button>
                      </form>
                    </div>
                   <hr>
                   </hr>
                   <h3> Previously uploaded reports</h3>
                   <table className="table">
                      <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Preview (Clickable)</th>
                        <th scope="col"> Report Name</th>
                        </tr>
                      </thead>          
                      <tbody id="doclist">
                       
                        {this.state.rep.map((rep,key)=>{
                          return(
                            console.log(rep,this.state.rep),
                            <tr key={key}>
                            <th>{key+1}</th>
                            <th scope="row">{this.state.rep[key]._rep ? (
                              <div className="c-doctor-card__photo_col pure-u-1-5">
                                <a target="blank" href={`https://ipfs.io/ipfs/${this.state.rep[key]._rep}`}>

                                  <img  
              src={`https://ipfs.io/ipfs/${this.state.rep[key]._rep}`}
              alt={`${rep[key]._rep}`}
              style={{
                
               
                maxWidth:50,
                height: '70%',
                width: '70%',
                objectFit: 'cover',
                // height='150', 
                // width='150',
              }}
            />
                            </a></div>
                              ) : (
                              <Image
                                src="https://api.fnkr.net/testimg/333x180/?text=IPFS"
                                className="card-img-top"
                                alt="NA"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  height: '100%',
                                  width: '100%',
                                  objectFit: 'cover',
                                  // height='150px', 
                                  // width='150px',
                                }}
                              />
                              )}</th>
                              {/* <td><b></b> {web3.utils.toUtf8(rep[0]._name)}</td>
                              <td><b></b> {web3.utils.toUtf8(rep[0]._spec)}</td>
                              <td><b></b> {web3.utils.toDecimal(rep[0]._exp)}</td>
                              <td><b></b>{(rep[1].add)}</td>
                              <td><b></b>{web3.utils.toUtf8(rep[1]._timingfrom)}</td>
                              <td><b></b>{web3.utils.toUtf8(rep[1]._timingtill)}</td>
                               */}
                              <td>{this.state.rep[key]._repname}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                
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
                  <div className="container-fluid data animate-right mt4" style={{
        backgroundColor: '#f5f5f5',
        width: '210mm',
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: '300mm',
        display:"none",
      }}  id="history" >
                    <h1>History</h1>
                     <div className="col text-center">
                      <table id="dlist"></table>
                      <button className="btn btn-primary" style={{position: 'absolute',
                      right:'0',
                      bottom:'0'}}onClick={this.printDocument}>Download History</button>
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