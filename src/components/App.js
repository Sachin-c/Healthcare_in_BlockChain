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
      <div >
        <div>
          <Navbar account={this.state.account} />
        </div>
        <div>
          {this.state.loading 
            ? <div id="loader" className="col-text-center"><h1 className="text-center">Loading..</h1></div>
            : 
            <div>
              <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="first-slide" src="/img2.jpg" alt="First slide"/>
                    <div className="container">
                      <div className="carousel-caption d-none d-md-block text-left">
                        <h1>Blockchain as an enabler of nationwide interoperability</h1>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        <p><a className="btn btn-lg btn-primary" href="/Patient" role="button">Patient</a></p>
                        <p><a className="btn btn-lg btn-primary" href="/Doctor" role="button">Doctor</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="second-slide" src="/img4.jpg" alt="Second slide"/>
                    <div className="container">
                      <div className="carousel-caption d-none d-md-block">
                        <h1>Increase patient satisfaction with morden technologies</h1>
                        <p>This app allows patients to fill out and submit healthcare forms automatically to healthcare providers from their smartphones. No clipboards, paper forms, or electronic tablets. What a relief!</p>
                          <p><a className="btn btn-lg btn-primary" href="/Patient" role="button">Patient</a></p>
                          <p><a className="btn btn-lg btn-primary" href="/Doctor" role="button">Doctor</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="third-slide" src="/img5.jpeg" alt="Third slide"/>
                    <div className="container">
                      <div className="carousel-caption d-none d-md-block text-right">
                        <h1>secure data and transfer it safely between devices and health service providers</h1>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        <p><a className="btn btn-lg btn-primary" href="/Patient" role="button">Patient</a></p>
                        <p><a className="btn btn-lg btn-primary" href="/Doctor" role="button">Doctor</a></p>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div className="container marketing">
                <div className="row">
                  <div className="col-lg-4">
                    <img className="rounded-circle" src="/pubhealth.jpg" alt="Generic placeholder image" width="140" height="140"/>
                    <h2>Public Health</h2>
                    <p>By using blockchain technology, regulatory bodies can create a shared stream of de-identified patient information. This stream will help authorities identify the pandemics or threats so they can take necessary action to control the problem in a timely manner.</p>
                    <p><a className="btn btn-secondary" href="" role="button">View details &raquo;</a></p>
                  </div>
                  <div className="col-lg-4">
                    <img className="rounded-circle" src="/datasec.jpg" alt="Generic placeholder image" width="140" height="140"/>
                    <h2>Data Security</h2>
                    <p>Blockchain technology is the smarter solution to safeguard the patient’s information. Blockchain prevents unauthorized individuals from accessing the information.</p>
                    <p><a className="btn btn-secondary" href="" role="button">View details &raquo;</a></p>
                  </div>
                  <div className="col-lg-4">
                    <img className="rounded-circle" src="/consent.jpg" alt="Generic placeholder image" width="140" height="140"/>
                    <h2>Managed Consent</h2>
                    <p>Patients can specifically authorize any individual to access their medical information.</p>
                    <p><a className="btn btn-secondary" href="" role="button">View details &raquo;</a></p>
                  </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                  <div className="col-md-7">
                    <h2 className="featurette-heading">Greater Transparency.</h2>
                    <p className="lead">Transaction histories are becoming more transparent through the use of blockchain technology. Because blockchain is a type of distributed ledger, all network participants share the same documentation as opposed to individual copies. That shared version can only be updated through consensus, which means everyone must agree on it. To change a single transaction record would require the alteration of all subsequent records and the collusion of the entire network. Thus, data on a blockchain is more accurate, consistent and transparent than when it is pushed through paper-heavy processes. It is also available to all participants who have permissioned access. To change a single transaction record would require the alteration of all subsequent records and the collusion of the entire network. Which can be, you know, a headache.
          Learn more about blockchain today</p>
                  </div>
                  <div className="col-md-5">
                    <img className="featurette-image img-fluid mx-auto" src="/pubhealth.jpg" alt="Generic placeholder image"/>
                  </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                  <div className="col-md-7 push-md-5">
                    <h2 className="featurette-heading">Increased efficiency and speed</h2>
                    <p className="lead">When you use traditional, paper-heavy processes, trading anything is a time-consuming process that is prone to human error and often requires third-party mediation. By streamlining and automating these processes with blockchain, transactions can be completed faster and more efficiently. Since record-keeping is performed using a single digital ledger that is shared among participants, you don’t have to reconcile multiple ledgers and you end up with less clutter. And when everyone has access to the same information, it becomes easier to trust each other without the need for numerous intermediaries. Thus, clearing and settlement can occur much quicker.</p>
                  </div>
                  <div className="col-md-5 pull-md-7">
                    <img className="featurette-image img-fluid mx-auto" src="/datasec.jpg" alt="Generic placeholder image"/>
                  </div>
                </div>

                <hr className="featurette-divider"/>

                <div className="row featurette">
                  <div className="col-md-7">
                    <h2 className="featurette-heading">Reduced costs</h2>
                    <p className="lead">For most businesses, reducing costs is a priority. With blockchain, you don’t need as many third parties or middlemen to make guarantees because it doesn’t matter if you can trust your trading partner. Instead, you just have to trust the data on the blockchain. You also won’t have to review so much documentation to complete a trade because everyone will have permissioned access to a single, immutable version.</p>
                  </div>
                  <div className="col-md-5">
                    <img className="featurette-image img-fluid mx-auto" src="/consent.jpg" alt="Generic placeholder image"/>
                  </div>
                </div>

                <hr className="featurette-divider"/>

                <footer>
                  <p className="float-right"><a href="">Back to top</a></p>
                </footer>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
