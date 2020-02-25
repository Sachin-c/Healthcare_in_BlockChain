import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import Doctorabi from '../abis/Doctor.json'
import Patientabi from '../abis/Patient.json'
class App extends Component {
   componentWillMount(){
     
   this.loadBlockchainData()   
  
  }

async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider)
  const accounts = await web3.eth.getAccounts()
  console.log(web3)
  
  this.setState({account:accounts[0]})  
  var net_id = 5777
  // await web3.eth.net.getId()
  var ret=0    
  if(Doctorabi.networks[net_id]){
    const d_abi= Doctorabi.abi
    var address= Doctorabi.networks[net_id].address
    var doctor= await web3.eth.Contract(d_abi,address)
    this.setState({doctor})
    ret = await this.state.doctor.methods.check(this.state.account).call()
    // console.log(ret.toString())
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

}
constructor(props){
  super(props)
  this.state={
    account:'',
    loading:true
  }
}
  render() {
    return (
      <div id="big-banner">
        <div>
          <Navbar account={this.state.account} />
        </div>
        <div>
          {this.state.loading 
            ? <div id="loader" class="col-text-center"><h1 className="text-center">Loading..</h1></div>
            : 
            <div className="row">
              <div className="col-sm-6">
                <p></p>
                <div class="r2 r3 r4 yc z9 za yb zb zc">
                  <a href="https://get.uber.com/sign-up/" target="_self" aria-label="" class="nq b5 nr ns ag am cj nt yh yi yj yk yl ym">
                    <div class="yn yo i6 on b5 f2 bj bk s5 bw bu bc yp yq">
                      <div class="fe yr bk c4 hk ys">
                        <div class="pf yt">
                          <h2 class="ig ih xo xp io ip f2 bi fp cu j4 fb uh">Sign up to ride</h2></div><div class="yu yv"><div class="yw al b7 yx iv yy yz"><div class="z0 z1 bw z2 z3 z4 is z5 bx"><div class="z6 dr is iu al z7 z8 uf"><svg aria-hidden="true" focusable="false" width="30px" height="1em" fill="currentColor" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.2354 2H24.2711L36 18L24.2711 34H18.2354L28.1237 20.56H0V15.44H28.1237L18.2354 2Z" fill="currentColor"></path></svg></div><div class="z6 dr is iu al z7 z8 uf"><svg aria-hidden="true" focusable="false" width="30px" height="1em" fill="currentColor" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.2354 2H24.2711L36 18L24.2711 34H18.2354L28.1237 20.56H0V15.44H28.1237L18.2354 2Z" fill="currentColor"></path></svg></div></div></div></div></div></div></a></div>
                {/* <a  href="/Patient"><button type="button" className="btn btn-default btn-outline-primary btn-sm" ><img src="/pat.png" height="50%" width="50%" ></img></button></a> */}
              </div>
              <div className="col-sm-6">
                <p></p>
                <a  href="/Doctor"><button type="button" className="btn btn-default btn-outline-primary btn-sm" ><img src="/pic.png" height="50%" width="50%" ></img></button></a>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
