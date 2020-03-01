import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Collapsible from 'react-collapsible';
import CreatableSelect from 'react-select/creatable';

import '../../node_modules/react-notifications/lib/notifications.css';
import Navbar from './Navbar'
import { DropdownButton } from 'react-bootstrap';
type State = {
  options: [{ [string]: string }],
  value: string | void,
};
const createOption = (label: string) => ({
  label,
  value: label,
});

const defaultOptions = [
      createOption('Coronary catheterization'),
      createOption('Electrocardiogram'),
      createOption('Echocardiography'),
      createOption('Skin allergy test'),
      createOption('Skin biopsy'),
      createOption('Hearing test'),
      createOption('Laryngoscopy'),
      createOption('Electronystagmography (ENG)'),
      createOption('Videonystagmography (VNG)'),
      createOption('Capsule endoscopy'),
      createOption('Coloscopy'),
      createOption('Endoscopic retrograde cholangiopancreatography'),
      createOption('Esophagogastroduodenoscopy'),
      createOption('Esophageal motility study'),
      createOption('Esophageal pH monitoring'),
      createOption('Liver biopsy'),
      createOption('Bone marrow examination'),
      createOption('Biochemistry'),
      createOption('Arterial blood gas (ABG)'),
      createOption('Complete blood count (CBC)'),
      createOption('Comprehensive metabolic panel (CMP) (including CHEM-7)'),
      createOption('Coagulation tests'),
      createOption('C-reactive protein'),
      createOption('Erythrocyte sedimentation rate (ESR)'),
      createOption('FibroTest'),
      createOption('Urea breath test'),
      createOption('Urinalysis'),
      createOption('Cytogenetics and Molecular Genetics'),
      createOption('Genetic testing'),
      createOption('Immunology'),
      createOption('Autoantibodies'),
      createOption('Microbiology'),
      createOption('Blood culture'),
      createOption('Mantoux test'),
      createOption('Sputum culture'),
      createOption('Stool culture'),
      createOption('Urine culture'),
      createOption('Electroencephalogram'),
      createOption('Electromyography (EMG)'),
      createOption('Lumbar puncture'),
      createOption('Neuropsychological tests'),
      createOption('Obstetric / Gynaecological	Edit'),
      createOption('Amniocentesis'),
      createOption('Colposcopy'),
      createOption('Hysteroscopy'),
      createOption('Pap smears'),
      createOption('Dilated fundus examination'),
      createOption('Multifocal electroretinography (mfERG)'),
      createOption('Optical coherence tomography (OCT)'),
      createOption('Visual field test'),
      createOption('Polysomnography'),
      createOption('Pulmonary pletysmography'),
      createOption('Thoracentesis'),
      createOption('CT scan (B*2**)'),
      createOption('Magnetic resonance imaging (MRI) (B*3**)'),
      createOption('Nuclear medicine (C****)'),
      createOption('Positron-emission tomography (PET)'),
      createOption('Projectional radiography (B*0**)'),
      createOption('Ultrasonography (B*4**)'),
      createOption('Arthroscopy'),
      createOption('Cystoscopy'),
      createOption('Urodynamic testing'),
];

class DoctorView extends Component {

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
  var et=0   
  if(Doctorabi.networks[net_id]){
    const d_abi= Doctorabi.abi
    var address= Doctorabi.networks[net_id].address
    var doctor= await web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    ret = await this.state.doctor.methods.check(this.state.account).call()
    console.log(window.location.href.toString().split("/")[3])
    if(ret>0 & (window.location.href.toString().split("/")[3]!="Doctor_View" | window.location.href.toString().split("/")[4]!=ret)){
        window.location.href="/Doctor_View/"+ret
    }else if(ret==-1){
      window.location.href="/"
    }else{
    this.setState({loading:false})
    }
  }
//   if(Patientabi.networks[net_id]){
//     console.log(this.state.account)
//     const p_abi= Patientabi.abi
//     address= Patientabi.networks[net_id].address
//     const patient= await web3.eth.Contract(p_abi,address)
//     this.setState({patient})
//     et = await this.state.patient.methods.check(this.state.account).call()
//     console.log(ret)
//     if(et>0 & window.location.href.toString().split("/")[3]!="Patient_View" | window.location.href.toString().split("/")[4]!=et){
//       // window.location.href="/Patient_View/"+et
//   }else if(ret==-1 & et==-1){
//     window.location.href="/"
//   }else{
//   this.setState({loading:false})
//   }
// }
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
    const count = await doctor.methods.getall1(id).call()
    console.log(count)
    this.setState({hash:count[3]})
    this.setState({name:web3.utils.toUtf8(count[0])})
    const result=await this.state.doctor.methods.getPlen(id).call()
    var patient= await web3.eth.Contract(Patientabi.abi,Patientabi.networks[net_id].address)
    this.setState({patient})
    
    for(var i=0;i< result.toString();i++){
      const doc=await doctor.methods.getP1(i,id).call()
      const doc2=await doctor.methods.getP2(i,id).call()
      
      this.setState({patients:[...this.state.patients,doc]})
      this.setState({patients2:[...this.state.patients2,doc2]})
      console.log(this.state.patients2)
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
handleChange = (newValue: any, actionMeta: any) => {
  this.setState({ value: newValue });
};
handleCreate = (inputValue: any) => {
  this.setState({ isLoading: true });
  
  setTimeout(() => {
    const { options } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    this.setState({
      isLoading: false,
      options: [...options, newOption],
      value: newOption,
    });
  }, 1000);
};
async write(name,age,gender,aler,pid,mname,mtype,test,edate,sdate,nof,summ,id){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var id = window.location.href.toString().split("/")[4]
  // console.log(pid,id)
  this.state.doctor.methods.WriteMedication(name,aler,Number(pid),web3.utils.fromAscii(mname),web3.utils.fromAscii(mtype),web3.utils.fromAscii(test),web3.utils.fromAscii(sdate),web3.utils.fromAscii(edate),web3.utils.fromAscii(nof),web3.utils.fromAscii(summ),id).send({from:this.state.account}).once('receipt',(receipt)=>{ this.setState({loading:false})}).once("confirmation", function () {
    NotificationManager.success('Prescribtion added', 'Check history',5000)
  }) 
  var p = Number(pid)
  this.setState({p})
}
async ph(key){
  var x= await this.state.patient.methods.hCount.call()
  if(document.getElementById("dlist").innerHTML=="")
  { 
    if(x.toString()==0)
    {
      document.getElementById("dlist").innerHTML="No prescriptions are there yet!! \n"
    }
    else{
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
      let p=document.createTextNode((no[0]+" was prescribed "+web3.utils.toUtf8(no[1])+" as "+web3.utils.toUtf8(no[2])+" from  "+ web3.utils.toUtf8(no[3])+" to "+web3.utils.toUtf8(no[4])+" and "+web3.utils.toUtf8(no[5])+ " times a day.").toString());
      newCell.appendChild(p);
    }
  }
}else{
  document.getElementById("wheel").innerHTML=""
}
}
async add(dname,mname,mtype,test,edate,sdate,nof,summ){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const abi= Patientabi.abi
  var net_id = 5777
  if(Patientabi.networks[net_id]){
    const address= Patientabi.networks[net_id].address
    const patient= await web3.eth.Contract(abi,address)
    this.setState({patient})
    console.log(dname)
    console.log(this.state.p)
    patient.methods.addDoc(web3.utils.fromAscii(dname),web3.utils.fromAscii(mname),web3.utils.fromAscii(test),web3.utils.fromAscii(sdate),web3.utils.fromAscii(edate),web3.utils.fromAscii(nof),web3.utils.fromAscii(summ),this.state.p).send({from:this.state.account}).once('receipt',(receipt)=>{ this.setState({loading:false})}).once("confirmation", function () {
      NotificationManager.success('Patient got prescribtion', 'Inform Patient',5000)
      window.setTimeout(function(){window.location.reload()}, 3000)    
    }) 

    // var id = window.location.href.toString().split("/")[4]
    // const result=await this.state.doctor.methods.getPlen(id).call()
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async openLink(tabName){
    var i;
    var x = document.getElementsByclassName("data");
    console.log(x);
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}


constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true,
    list:true,
    info:'',
    patients:[],
    patients2:[],
    plist:[],
    options: defaultOptions,
    value: undefined,
  }
  this.hist = this.hist.bind(this);

}

  render() {
    const { isLoading, options, value } = this.state;

    const ipfsHash = this.state.hash
    return (
          <div className="d-flex" id="wrapper">
            <div className="bg-light border-right" id="sidebar-wrapper" >
              <div className="sidebar-heading"> Name</div>
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action bg-light tablink" onClick={(e) => this.openLink('dashboard')} >Dashboard</a>
                <a href="#" className="list-group-item list-group-item-action bg-light tablink" onClick={(e) => this.openLink('appointment')}>Make an Appointment</a>
                <a href="#" className="list-group-item list-group-item-action bg-light tablink" onClick={(e) => this.openLink('report')} >Reports</a>
                <a href="#" className="list-group-item list-group-item-action bg-light tablink" onClick={(e) => this.openLink('profile')} >Profile</a>
                <a className="list-group-item list-group-item-action bg-light tablink" onClick={this.openLink.bind(this,'history')}>History</a>
              </div>
            </div>

            <div id="page-content-wrapper">

              <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <button className="btn btn-primary" id="menu-toggle">
                  Toggle Menu
                </button>

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
                ? <div id="loader" className="text-center "><h1 className="text-center">Loading..</h1></div>
                :
                <div>
                  <div className="container-fluid data animate-right" id="dashboard">
                    <h1 className="mt-4">Requests will be shown below</h1>
                    <div id="box" className="col">
                      {this.state.list
                        ?<div><h3>No requests yet</h3></div>
                        :
                        <ul>   
                          {this.state.patients.map((patient,key)=>{
                            return(
                                  <li key={key}>
                                    <button  className="btn-primary" onClick={(e) => this.ph(patient[5])} title="View Patient History">View Patient History</button>
                                    <table id="dlist"></table>
                                    <form id="form1" onSubmit= { event=> {
                                      this.setState({loading:true})
                                      event.preventDefault()
                                      
                                      const mname=this.mname.value
                                      const mtype=this.mtype.value
                                      const sdate=this.sdate.value
                                      const edate=this.edate.value
                                      const nof=this.nof.value
                                      const summ=this.summ.value
                                      var aler="";
                                      if(this.state.patients2[key].length!=0){
                                        for(var i=0;i<this.state.patients2[key].length;i++){
                                          aler=aler+this.state.patients2[key][i].toString()
                                          if(i!=this.state.value.length-1){
                                            aler=aler+", "
                                          }
                                        }
                                      }
                                      else{
                                        aler="None"
                                      }
                                      var test="";
                                      console.log(this.state.value)
                                      if(this.state.value!=undefined){
                                        for(var i=0;i<this.state.value.length;i++){
                                          console.log(this.state.value[i].label)
                                          test=test+this.state.value[i].label.toString()
                                          if(i!=this.state.value.length-1){
                                            test=test+", "
                                          }
                                        }
                                      }
                                      else{
                                        test="None"
                                      }
                                      // const doc=this.state.doctor.geta
                                      this.write(patient._name,patient._age,patient._gender,aler,patient._pid.toString(),mname,mtype,test,edate,sdate,nof,summ,key)   
                                      this.add(this.state.info,mname,mtype,test,edate,sdate,nof,summ)
                                      
                                      }}> 
                                      <h6 id="print">{patient._name}({patient._age.toString()} years old) is {patient._gender} with blood group {patient._bg}</h6>
                                      <h6>Allergies from: {this.state.patients2[key]}</h6>
                                      {/* { this.setmindate()} */}
                                      {/* <p className="text-danger" id="error"></p> */}

                                      <div className="form-group text-center">
                                        <label htmlFor="Medicine">Medicine</label>
                                        <input type="med" className="form-control" required ref={(input) => {this.mname=input}} id="medicine" placeholder="Medicine Name"></input>
                                      </div>
                                      <div className="form-group text-center"> 
                                        <label htmlFor="type">Medicine Type</label>
                                        <select  name="type" className="form-control" ref={(input) => {this.mtype=input}} >
                                          <option value="Liquid"defaultValue>Liquid</option>
                                          <option value="Tablet">Tablet</option>
                                          <option value="Capsule">Capsule</option>
                                        </select>
                                      </div>
                                      <div className="form-group text-center"> 
                                        <label htmlFor="type">Suggest tests</label>
                                        <CreatableSelect
                                              isClearable
                                              isDisabled={isLoading}
                                              isLoading={isLoading}
                                              onChange={this.handleChange}
                                              // onCreateOption={this.handleCreate}
                                              options={options}
                                              value={value}
                                              isMulti
                                              required
                                              placeholder="Search or type and create new tests if not in list"
                                              ref={(input) => {this.aler=input}}
                                            />
                                      </div>
                                      
                                      <div className="form-group text-center" data-provide="datepicker">
                                        <label htmlFor="Start Date">Start taking medicines from</label><br/>
                                        <input type="date" id="ssdate" required ref={(input) => {this.sdate=input}}/>
                                      </div>
                                           
                                      <div className="form-group text-center" data-provide="datepicker">
                                        <label htmlFor="Start Date">Medicines to be taken till</label><br/>
                                        <input type="date" required ref={(input) => {this.edate=input}}/>
                                      </div>

                                      <div className="form-group text-center"> 
                                        <label htmlFor="type">Number of times medicine to be taken in a day </label>
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
                                      <div className="form-group text-center"> 
                                        <label htmlFor="type">Summary for medication</label>
                                        <textarea type="text" className="form-control" id="summ" required ref={(input) => {this.summ=input}}></textarea>
                                      </div>
                                      <button id="button" type="submit"  className="btn btn-primary">Submit</button> 
                                    </form>
                                  </li>
                                )
                              }
                            )
                          }    
                        </ul>  
                      }
                    </div>
                  </div>
                <div className="container-fluid data animate-right" id="appointment" style={{display:"none"}}>
                <h1>Appointment</h1>
                <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                    <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
                </div>
                <div className="container-fluid data animate-right" id="report" style={{display:"none"}}>
                <h1>Reports</h1>
                <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                    <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
                </div>
                <div className="container-fluid data animate-right" id="profile" style={{display:"none"}}>
                <h1>Profile</h1>
                <div id="box" className="col">
                  <h1 className="text-center">Your Bio</h1>
                  <div className="row">
                    <div className="col-sm-6">
                    <h4 > Name : </h4>
                    </div>
                    <div className="col-sm-6">
                    <h4 id="name" >{this.state.name}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="c-doctor-card__photo_col pure-u-1-3">
                          {ipfsHash ? (
                            <img
                              src={`https://ipfs.io/ipfs/${ipfsHash}`}
                              className="card-img-top"
                              alt={`${ipfsHash}`}
                            />
                          ) : (
                            <img
                              src="https://api.fnkr.net/testimg/333x180/?text=IPFS"
                              className="card-img-top"
                              alt="NA"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                {/* <div className="row">
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
                    <h4 id="gender"></h4>
                    </div>
                  </div> */}
                  <script>var age=</script>
                </div>
                </div>
                <div className="container-fluid data animate-right" id="history" style={{display: "none"}}>
                <h1>History</h1>
                <button id="button"  onClick={this.hist} className="btn btn-primary">History</button>
                <table id="wheel"></table>
                </div>
              </div>
          }
            </div>
          </div>
    );
  }
}

export default DoctorView;
