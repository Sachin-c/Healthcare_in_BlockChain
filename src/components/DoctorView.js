import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../../node_modules/react-notifications/lib/notifications.css';
import Navbar from './Navbar'

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
  if(Doctorabi.networks[net_id]){
    const address= Doctorabi.networks[net_id].address
    const doctor= await web3.eth.Contract(abi,address)
    this.setState({doctor})
    this.setState({loading:false})
    var id = window.location.href.toString().split("/")[4]
    const count = await doctor.methods.getall(id).call()
    this.setState({info:count[0]})
    console.log(this.state.info)
    const result=await this.state.doctor.methods.getPlen(id).call()
    console.log(result)
    for(var i=0;i< result.toString();i++){
      const doc=await doctor.methods.getP(i,id).call()
      this.setState({patients:[...this.state.patients,doc]})
  }
  console.log(this.state.patients)
    if (result.toString()>0){
        this.setState({list:false})  
        }
        else{
          this.setState({list:true})  
    }
  }else{
    window.alert("Contract not loaded to blockchain")
  }
  
}
async write(name,age,gender,bg,pid,mname,mtype,edate,sdate,nof,id){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var id = window.location.href.toString().split("/")[4]
  // console.log(pid,id)
  this.state.doctor.methods.WriteMedication(name,age,gender,bg,Number(pid),web3.utils.fromAscii(mname),web3.utils.fromAscii(mtype),web3.utils.fromAscii(sdate),web3.utils.fromAscii(edate),web3.utils.fromAscii(nof),id).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
    NotificationManager.success('Prescribtion added', 'Check history',5000)
  }) 
  var p = Number(pid)
  this.setState({p})
}
async hist(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
   var key = window.location.href.toString().split("/")[4]
  var x= await this.state.doctor.methods.treatCount.call()
  for(var i=1;i<=x.toString();i++){
    var no= await this.state.doctor.methods.GetMedicationList(i,key).call()
    if(no[0]!=""){
      let tableRef = document.getElementById("wheel");
      let newRow = tableRef.insertRow(-1);
      let newCell = newRow.insertCell(0);
      console.log(no)
      newCell.setAttribute("style","padding: 26px; display: inline-block; text-align: center")
      let p=document.createTextNode((no[0]+" was prescribed "+web3.utils.toAscii(no[1])+" as "+web3.utils.toAscii(no[2])+" from  "+ web3.utils.toAscii(no[3])+" to "+web3.utils.toAscii(no[4])+" and "+web3.utils.toAscii(no[5])+ " times a day.").toString());
      newCell.appendChild(p);
    }
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
    patient.methods.addDoc(dname,mname,sdate,edate,nof,this.state.p).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
      NotificationManager.success('Patient got prescribtion', 'Inform Patient',5000)
      window.setTimeout(function(){window.location.reload()}, 3000)    
    }) 

    var id = window.location.href.toString().split("/")[4]
    const result=await this.state.doctor.methods.getPlen(id).call()
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
    patients:[]
  }
  this.hist = this.hist.bind(this);

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
                <div>
                  <h2>Requests will be shown below </h2>
                  {this.state.list
                  ?<div> <h3>No requests yet</h3></div>
                 :
                 <ul>
                 {this.state.patients.map((patient,key)=>{
                   return(
                     <li key={key}>
                  <form id="form1" onSubmit={event=>{
                    event.preventDefault()
                    
                    const mname=this.mname.value
                    const mtype=this.mtype.value
                    const sdate=this.sdate.value
                    const edate=this.edate.value
                    const nof=this.nof.value
                    const doc=this.state.doctor.geta
                    this.write(patient._name,patient._age,patient._gender,patient._bg,patient._pid.toString(),mname,mtype,edate,sdate,nof,key)   
                    this.add(this.state.info,mname,mtype,edate,sdate,nof)
                  }}> <h6 id="print">{patient._name}({patient._age.toString()} years old) is {patient._gender} with blood group {patient._bg} 
                  </h6>
                    {/* { this.setmindate()} */}
                    <p className="text-danger" id="error"></p>
                    <div className="form-group">
                            <label htmlFor="Medicine">Medicine</label>
                            <input type="med" className="form-control" ref={(input) => {this.mname=input}} id="medicine" placeholder="Medicine Name"></input>
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
                            <input type="date" id="ssdate"  ref={(input) => {this.sdate=input}}/>
                    </div>
                           
                    <div className="form-group" data-provide="datepicker">
                        <label htmlFor="Start Date">End Date</label><br/>
                        <input type="date"  ref={(input) => {this.edate=input}}/>
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







/* <html>
        <head>
         
				section {
					width: 100%;		
				}
				.left-half {
				float: left;
				width: 50%;
				}
				.right-half {
				float: left;
				width: 50%;
				}
			</style>
        </head>
        <body>
                <section className="container" >
                        <div className="left-half">
                    
            <h1>Your doctors Request will be shown below </h1>
            <h4 id="print" style="border: 20px; padding: 20px;"></h4>
            <div id="form">
            <form id="form1">
                    <p className="text-danger" id="error"></p>
                    <div className="form-group">
                            <label htmlFor="Medicine">Medicine</label>
                            <input type="med" className="form-control" id="medicine" placeholder="Medicine Name">
                          </div>
                    <div className="form-group"> 
                            <label htmlFor="type">Medicine Type</label>
                        <select  name="type" className="form-control" data-toggle="dropdown">
                            <option value="Liquid"selected>Liquid</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Capsule">Capsule</option>
                        </select>
                    </div>
                    
                    <div className="form-group" data-provide="datepicker">
                            <label htmlFor="Start Date">Start Date</label>
                            <input type="date" name="bday">  
                    </div>
                    <div className="form-group" data-provide="datepicker">
                        <label htmlFor="Start Date">End Date</label>
                        <input type="date" name="bday">  
                    </div>

                    <div className="form-group"> 
                            <label htmlFor="type">Number of times a day </label>
                        <select  name="numberof" className="form-control" data-toggle="dropdown">
                            <option value="1"selected>1</option>
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
                </form>
                <button id="button" onclick="setvalue();setdoctor();" className="btn btn-primary">Submit</button>       
            </div>
            <button id="button" onclick="getvalue();" className="btn btn-primary">History</button>  
            </div>
            <div className="right-half" >
                    <table id="wheel"></table>
            </div>
             </section>
                
            <script>
                    
                     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//*****************************************Doctor ABI *************************************/
//                       var abi=

//                     var address='0xEc3aB2F975B0c4cc1deD396c262bF4c04086fF86';

//                     var Courses = new web3.eth.Contract(abi,address);
                    
//                     Courses.methods.getP().call().then(function(number){
//                     if (number[0]!=""){
//                         document.getElementById("form").style.display="block";     
//                         }
//                         else{
//                             document.getElementById("form").style.display="none";     
//                     }
//                     // console.log(number[0])
//                     var result=number;
//                     var total=result[4];
//                     if(number[0]==""){
//                         document.getElementById("print").innerHTML="No requests yet";
//                     }
//                     else{
//                     document.getElementById("print").innerHTML=result[0]+"("+result[1]+" years old) is "+result[2]+" with blood group "+result[3] ;}
//                     });
//                     function setvalue(){
//                         web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// //***********************************Doctor ABI ***************************************//
//                     var abi=
//                     var address='0xEc3aB2F975B0c4cc1deD396c262bF4c04086fF86';
//                     var Courses = new web3.eth.Contract(abi,address);
//                         Courses.methods.getP().call().then(function(number){
//                             var name=number[0];
//                             var age=number[1];
//                             var gender=number[2];
//                             var bg=number[3];
//                             var med=document.getElementById("form1").elements[0].value;
//                             var type=document.getElementById("form1").elements[1].value;
//                             var sdate=document.getElementById("form1").elements[2].value;
//                             var edate=document.getElementById("form1").elements[3].value;
//                             var nop=document.getElementById("form1").elements[4].value;
//                     Courses.methods.WriteMedication(name,age,gender,bg,med,type,sdate,edate,nop).send({from:'0x2823659f9FD99f95B44bc4C0A808eebcA069F690',gas: 3000000}, function (error, result){
//                     console.log(number);
//                     });
//                     });
//                  }
//                  function getvalue(){
//                     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// //*******************************************Doctor ABI ****************************************//
//                     var abi=

//                     var address='0xEc3aB2F975B0c4cc1deD396c262bF4c04086fF86';
//                     var Doctors = new web3.eth.Contract(abi,address);
//                     var i=1;
// 			var list, li, index;
// 			list = document.getElementById('listed');
//                         Doctors.methods.GetMedicationList(i).call().then(function(no){
// 						console.log(no);
// 					htmlFor(i=1;i<=no[6];i++)
//                     {	
// 						Doctors.methods.GetMedicationList(i).call().then(function(no){
//                         let tableRef = document.getElementById("wheel");
//                         let newRow = tableRef.insertRow(-1);
//                         let newCell = newRow.insertCell(0);
//                         let newText = document.createTextNode
                        
// 						newCell.setAttribute("style","padding: 26px; display: inline-block; text-align: center")
						
// 						  x=(no[0]+" was prescribed "+web3.utils.toAscii(no[1])+" as "+web3.utils.toAscii(no[2])+" from  "+ web3.utils.toAscii(no[3])+" to "+web3.utils.toAscii(no[4])+" and "+web3.utils.toAscii(no[5])+ " times a day.").toString();
						  
// 						  let p=document.createTextNode(x);
						
// 						  newCell.appendChild(p);})
// 			   }});
//                  }
//                  function setdoctor(){
// //*******************************************Doctor ABI ****************************************//
//                     var abi=
                    

                    
//                     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//                     var address='0xEc3aB2F975B0c4cc1deD396c262bF4c04086fF86';
//                     var Doctors = new web3.eth.Contract(abi,address);
//                     Doctors.methods.get().call().then(function(number){
//*******************************************doctor ABI ***************++++++++++++++++++++++++++//
        //              var abi=          

        //                 console.log(number[0]);
        //                 var net_address='0x591af41279Fa3fA9A81451D3404037540DDc3CCE';
        //                 web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));                                    
        //               var Courses = new web3.eth.Contract(abi,net_address);
        //               var med=document.getElementById("form1").elements[0].value;
        //               var type=document.getElementById("form1").elements[1].value;
        //               var sdate=document.getElementById("form1").elements[2].value;
        //               var edate=document.getElementById("form1").elements[3].value;
        //               var nop=document.getElementById("form1").elements[4].value;
        //               Courses.methods.addDoc(number[0],med,sdate,edate,nop).send({from:'0x2823659f9FD99f95B44bc4C0A808eebcA069F690',gas: 3000000}, function (error, result) {
                        
        //               });
        //             });

        //          }
        //     </script>
        // </body>
