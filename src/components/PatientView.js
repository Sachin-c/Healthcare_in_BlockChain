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
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
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
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
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
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const abi= Doctorabi.abi
  const net_id=await web3.eth.net.getId()
  if(Doctorabi.networks[net_id]){
    const address= Doctorabi.networks[net_id].address
    const doctor= web3.eth.Contract(abi,address)
    this.setState({doctor})
    console.log(key,Number(id))
    this.state.doctor.methods.setp(Number(id),key).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
    });
    // this.state.doctor.methods.setPP(web3.utils.fromAscii(id)).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
    // });
    this.state.doctor.methods.setAddressB(Patientabi.networks[net_id].address).send({from:this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on("confirmation", function () {
      NotificationManager.success('Your prescribtion will be added by doctor', 'Doctor was notified',5000)
      
      window.setTimeout(function(){window.location.reload()}, 3000);    
    })
  }else{
    window.alert("Contract not loaded to blockchain")
  }
}
async hist(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  var key = window.location.href.toString().split("/")[4]
 var x= await this.state.patient.methods.hCount.call()
 for(var i=1;i<=x.toString();i++){
   var no= await this.state.patient.methods.viewHist(i,key).call()
   console.log(no)
   if(no[0]!=""){
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







           
               
//             <meta charset="utf-8" />
// 			<style type="text/css">
// 				section {
// 					width: 100%;		
// 				}
// 				.left-half {
// 				float: left;
// 				width: 50%;
// 				}
// 				.right-half {
// 				float: left;
// 				width: 50%;
// 				}
// 			</style>
//         </head>
//     <body><table id="wheel" style="float: right;"></table>
        
// 		<section class="container" >
// 			<div class="left-half">
// 				<table id="print" style="padding: 30px"></table>
				
// 			</div>
// 			<div class="right-half" id="myList">
// 			</div>
// 		</section>
//         <script>
// //*******************************************Patient ABI ******************************************//
                      
						


// 						var net_address='0x591af41279Fa3fA9A81451D3404037540DDc3CCE';
//                         web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));                                    
//                       var Courses = new web3.eth.Contract(abi,net_address);                      
//                       Courses.methods.get().call().then(function(number){
//                       console.log(number)
//                       var result=number;
//                       var total=result[4];
//                       document.getElementById("name").innerHTML=result[0]
//                       document.getElementById("age").innerHTML=result[1]
//                       document.getElementById("gender").innerHTML=result[2]
//                       document.getElementById("bg").innerHTML=result[3] 
//                       })
//            function getdoctors(){
//                try{
// 				// let fs = require('fs');
// 				// console.log(fs);
// 				// const contract = JSON.parse(fs.readFileSync('./build/contracts/Doctor.json', 'utf8'));
// 				// console.log(JSON.stringify(contract.abi));
				
// //*******************************************Doctor ABI*******************************************//
                

// 			var d_address='0xEc3aB2F975B0c4cc1deD396c262bF4c04086fF86';
//             web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//             var Doctors = new web3.eth.Contract(d_abi,d_address);
// 			var i=1;
// 			var list, li, index;
// 			list = document.getElementById('listed');
//                         Doctors.methods.getall(i).call().then(function(no){
// 						console.log(no);
// 					for(i=1;i<=no[3];i++)
//                     {	
// 						Doctors.methods.getall(i).call().then(function(no){
//                         let tableRef = document.getElementById("print");
//                         let newRow = tableRef.insertRow(-1);
//                         let newCell = newRow.insertCell(0);
//                         let newText = document.createTextNode
// 						newCell.setAttribute("style","padding: 26px; display: inline-block; text-align: center")
						
// 						  x=(no[0]+"("+no[1]+" years old) is "+no[2]).toString();
						  
// 						  let p=document.createTextNode(x);
						
// 						  newCell.appendChild(p);})
// 			   }
// 			   list = document.getElementById('myList');
// 			   for (index = 1; index <=no[3]; ++index) {
// 						li = document.createElement('button');
// 						li.setAttribute("onClick","selecting(this.id)" );
// 						li.setAttribute("style","display: inline-block; margin :16px")
// 						li.setAttribute("class","btn btn-primary")		
// 						li.id = index
// 						li.innerHTML="Select"
// 						list.appendChild(li);
// 						var br = document.createElement("br");
// 						list.appendChild(br);
// 					}	
// 			});
//                }catch(err){
//                         document.getElementById("print").innerHTML = err;
//                }
// 		   }
		   
// 		   function selecting(u)
// 		   {
// //***************************************  Doctor ABI ***************************************************//
// 			var d_abi=

// 			var d_address='0xEc3aB2F975B0c4cc1deD396c262bF4c04086fF86';
// 			web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//             var Doctors = new web3.eth.Contract(d_abi,d_address);
// 			Doctors.methods.setP(u).send({from:'0x2823659f9FD99f95B44bc4C0A808eebcA069F690',gas: 3000000}, function (error, result) {
//                     console.log(u);
//                     });
// 		   }
// 		   function gethistory()
// 		   {
// //*********************************************Patient ABI ******************************************//
// 						var abi=


// 						var net_address='0x591af41279Fa3fA9A81451D3404037540DDc3CCE';
//                         web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));                                    
// 					  var Courses = new web3.eth.Contract(abi,net_address);
// 					  var i=1;
// 						var list, li, index;
//                         Courses.methods.viewHist(i).call().then(function(no){
// 						console.log(no);
// 					for(i=1;i<=no[5];i++)
//                     {	
// 						Courses.methods.viewHist(i).call().then(function(no){
//                         let tableRef = document.getElementById("wheel");
//                         let newRow = tableRef.insertRow(-1);
//                         let newCell = newRow.insertCell(0);
//                         let newText = document.createTextNode
// 						newCell.setAttribute("style","padding: 26px; display: inline-block; text-align: center")			
// 						  x=(no[0]+"  prescribed to have "+no[1]+" from  "+no[2]+" to "+no[3]+" "+no[4]+"times a day").toString();
// 						  let p=document.createTextNode(x);		
// 						  newCell.appendChild(p);})
// 			   }
// 			});
					        
// 		   }
//         </script>
//     </body>
// </html>




