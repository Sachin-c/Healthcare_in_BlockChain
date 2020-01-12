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
  const web3 = new Web3(Web3.givenProvider|| "http://192.168.0.103:7545" || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const abi= Patientabi.abi
  const net_id=await web3.eth.net.getId()
  if(Patientabi.networks[net_id]){
    const address= Patientabi.networks[net_id].address
    const patient= await web3.eth.Contract(abi,address)
    this.setState({patient})
    this.setState({loading:false})
    var id = window.location.href.toString().split("/")[4]
    this.setState({id})
    const p=await this.state.patient.methods.getall(id).call();
    this.setState({
      info:p
    })
    // console.log((this.state.info[1]).toString())
    
    document.getElementById('age').innerHTML=(this.state.info[1]).toString();
  }else{
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
  const web3 = new Web3(Web3.givenProvider|| "http://192.168.0.103:7545" || "http://localhost:7545")
  const abi= Doctorabi.abi
  const net_id=await web3.eth.net.getId()
  if(Doctorabi.networks[net_id]){
    const address= Doctorabi.networks[net_id].address
    const doctor= web3.eth.Contract(abi,address)
    
    const count = await doctor.methods.doctorCount.call()
    for(var i=1;i<= count;i++){
        const doc=await doctor.methods.getall(i).call()
        this.setState({doctors:[...this.state.doctors,doc]})
    }
    console.log(this.state.doctors)
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async selecting(id,key){
  
  this.setState({loading:true})
  const web3 = new Web3(Web3.givenProvider|| "http://192.168.0.103:7545" || "http://localhost:7545")
  const abi= Doctorabi.abi
  const net_id=await web3.eth.net.getId()
  if(Doctorabi.networks[net_id]){
    const address= Doctorabi.networks[net_id].address
    const doctor= web3.eth.Contract(abi,address)
    this.setState({doctor})
    console.log(key,Number(id))
    this.state.doctor.methods.setp(Number(id),key,Patientabi.networks[net_id].address).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
    // });
    // this.state.doctor.methods.setAddressB(Patientabi.networks[net_id].address).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
      NotificationManager.success('Your prescribtion will be added by doctor', 'Doctor was notified',5000)
      window.setTimeout(function(){window.location.reload()}, 3000);    
    });
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async hist(){
  // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var key = window.location.href.toString().split("/")[4]
 var x= await this.state.patient.methods.hCount.call()
 document.getElementById("dlist").innerHTML=""
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

  render() {
    return (
      <div>
        <NotificationContainer/>
       <Navbar account={this.state.account} />
       <br></br><br></br>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {this.state.loading 
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                :
                <div>
                  <h1>Your Bio</h1>
                <h4 > Name : </h4><h4 id="name" >{this.state.info[0]}</h4><br/>
                <script>var age=</script>
                  <h4 > Age : </h4><h4 id="age"></h4><br/>
                  <h4 > Gender : </h4><h4 id="gender">{this.state.info[2]}</h4><br/>
                  <h4 > Blood Group : </h4><h4 id="bg" >{this.state.info[3]}</h4><br/>
                  <h3>Doctors to consult from</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col"> selecting</th>
                      </tr>
                    </thead>          
                    <tbody id="doclist">
                      {this.state.doctors.map((doctor,key)=>{
                        return(
                          <tr key={key}>
                            <th scope="row">{key+1}</th>
                        <td>{doctor._name}</td>
                        <td>
                          <button className="btn btn-primary"
                            onClick={()=> {
                              // console.log(key+1);
                              this.selecting(this.state.id,key+1);
                          }
                            }
                          
                          >Select</button></td>


                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                 
                  <button id="button" onClick={this.hist} class="btn btn-primary">See History</button> 
                  <table id="dlist"></table>
                  
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

export default PatientView;







           
               
