import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
import Navbar from './Navbar'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CreatableSelect from 'react-select/creatable';

import '../../node_modules/react-notifications/lib/notifications.css';
// import { callExpression } from '@babel/types';
// import routing from './../index'
type State = {
  options: [{ [string]: string }],
  value: string | void,
};
const createOption = (label: string) => ({
  label,
  value: label,
});

const defaultOptions = [
  createOption('amoxicillin (Moxatag)'),
  createOption('ampicillin'),
  createOption('penicillin (Bicillin L-A)'),
  createOption('Tetracycline (Sumycin)'),
  createOption('Cetuximab (Erbitux)'),
  createOption('Ibuprofen'),
  createOption('Naproxen'),
  createOption('Aspirin'),
  createOption('Sulfa drugs'),
  createOption('Chemotherapy drugs'),
  createOption('Rituximab (Rituxian)'),
  createOption('Nevirapine (Viramune)'),
  createOption('Abacavir (Ziagen)'),
  createOption('Insulin'),
  createOption('Lamotrigine (Lamictal)'),
  createOption('Phenytoin'),
  createOption('Carbamazepine (Tegretol)'),
  createOption('Succinylcholine'),  
  createOption('Vecuronium'),
  createOption('Atracurium'),
];

 class Patient extends Component<*, State> {

   componentWillMount(){
   this.loadBlockchainData()
    
  }


async loadBlockchainData(){
  
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const abi= Patientabi.abi
  var net_id = 5777
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
  else{
    window.alert("Contract not loaded to blockchain")
  }
  
}
constructor(props){
  super(props)
  
  this.state={
    account:'',
    loading:true,
    options: defaultOptions,
    value: undefined,
    
  }
  this.set=this.set.bind(this);

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
async set(name,age,gender,bg){
 if(age<=0)
  {
    NotificationManager.warning('Please enter a valid age','Incorrect age', 3000);
  }
  else{
  this.setState({loading : true})
  var aler="";
  console.log(this.state.value)
  if(this.state.value!=undefined)
  {
    for(var i=0;i<this.state.value.length;i++)
    {
      console.log(this.state.value[i].label)
      aler=aler+this.state.value[i].label.toString()
      if(i!=this.state.value.length-1)
      {
        aler=aler+", "
      }
    }
  }
  else{
    aler="None"
  }
  console.log(aler)
    var count= await this.state.patient.methods.patientCount().call()
   this.state.patient.methods.set(name,age,gender,aler,bg,this.state.account).send({from: this.state.account}).on('receipt',(receipt)=>{ this.setState({loading:false})}).on('error', function(error){
    NotificationManager.error('Patient account not created', 'Transaction cancelled!', 5000)
      window.setTimeout(function(){window.location.reload()}, 3000);    
  }).on("confirmation", function () {
    count =Number(count)+Number(1)
    window.location.href="/Patient_View/"+count.toString()
 
});
}
   
}
  render() {
    const { isLoading, options, value } = this.state;

    return (
      
      
      <div id="big-banner" >
        <NotificationContainer/>
       <Navbar account={this.state.account} />
          <div className="row border border-danger">
              <div className="content mr-auto ml-auto">
                {this.state.loading 
                ? <div id="loader" className="text-center"><h1 className="text-center">Loading..</h1></div>
                :
                                  <form id="box" className="" onSubmit={event=>{
                                    event.preventDefault()
                                    const name=this.pname.value
                                    const age=this.page.value
                                    const gender=this.pgen.value
                                    const bg= this.pbg.value
                                    this.set(name,age,gender,bg)   
                                  }}>
                                <p className="text-danger" id="error"></p>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Name">Name:</label>
                                  </div>
                                  <div className="col-sm-8">
                                    <input type="text" className="form-control" id="name" required ref={(input) => {this.pname=input}} placeholder="Enter Name"></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Age">Age:</label>
                                  </div>
                                  <div className="form-group col-sm-8">  
                                    <input type="number" className="form-control" id="age" required ref={(input) => {this.page=input}} placeholder="Age"></input>
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
                                    <label htmlFor="Allergies">Search Allergies </label>
                                    <label htmlFor="Allergies">(If not in list, type and select create)</label>
                                  </div>
                                  <div className="form-group col-sm-8">
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
                                      placeholder="Search or type allergies if not in list"
                                      ref={(input) => {this.aler=input}}
                                    />
                                  </div>
                                </div>
                                
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="Blood Group">Blood Group:</label>
                                  </div>
                                  <div className="form-group col-sm-8">
                                  {/* <input type="text" className="form-control" id="bg" ref={(input) => {this.pbg=input}} placeholder="Blood Group"></input> */}
                                    <select  name="bg" className="form-control" ref={(input) => {this.pbg=input}} >
                                      <option value="O+"defaultValue>O+</option>
                                      <option value="O-">O-</option>
                                      <option value="A+">A+</option>
                                      <option value="A-">A-</option>
                                      <option value="B+">B+</option>
                                      <option value="B-">B-</option>
                                      <option value="AB+">AB+</option>
                                      <option value="AB-">AB-</option>
                                    </select>
                                  </div>
                                </div>
                              <button id="button" type="submit"  className="btn btn-primary">Submit</button> 
                           </form>      
                          }
                        </div>
                    </div>
                  </div>
              );
            }
          }
export default Patient;
                 {/* <TouchableOpacity onPress={() => { onPress('YourPage'); }} n> */}
                  {/* <Text> Move</Text> */}
                {/* </TouchableOpacity> */}