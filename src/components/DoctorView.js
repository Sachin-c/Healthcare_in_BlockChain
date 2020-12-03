import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Doctorabi from "../abis/Doctor.json";
import Patientabi from "../abis/Patient.json";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Collapsible from "react-collapsible";
import CreatableSelect from "react-select/creatable";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import "../../node_modules/react-notifications/lib/notifications.css";
import Navbar from "./Navbar";
import { DropdownButton } from "react-bootstrap";
import TaskList from "./taskList";
import axios from "axios";

type State = {
  options: [{ [string]: string }],
  value: string | void,
};
const createOption = (label: string) => ({
  label,
  value: label,
});

const defaultOptions = [
  createOption("Coronary catheterization"),
  createOption("Electrocardiogram"),
  createOption("Echocardiography"),
  createOption("Skin allergy test"),
  createOption("Skin biopsy"),
  createOption("Hearing test"),
  createOption("Laryngoscopy"),
  createOption("Electronystagmography (ENG)"),
  createOption("Videonystagmography (VNG)"),
  createOption("Capsule endoscopy"),
  createOption("Coloscopy"),
  createOption("Endoscopic retrograde cholangiopancreatography"),
  createOption("Esophagogastroduodenoscopy"),
  createOption("Esophageal motility study"),
  createOption("Esophageal pH monitoring"),
  createOption("Liver biopsy"),
  createOption("Bone marrow examination"),
  createOption("Biochemistry"),
  createOption("Arterial blood gas (ABG)"),
  createOption("Complete blood count (CBC)"),
  createOption("Comprehensive metabolic panel (CMP) (including CHEM-7)"),
  createOption("Coagulation tests"),
  createOption("C-reactive protein"),
  createOption("Erythrocyte sedimentation rate (ESR)"),
  createOption("FibroTest"),
  createOption("Urea breath test"),
  createOption("Urinalysis"),
  createOption("Cytogenetics and Molecular Genetics"),
  createOption("Genetic testing"),
  createOption("Immunology"),
  createOption("Autoantibodies"),
  createOption("Microbiology"),
  createOption("Blood culture"),
  createOption("Mantoux test"),
  createOption("Sputum culture"),
  createOption("Stool culture"),
  createOption("Urine culture"),
  createOption("Electroencephalogram"),
  createOption("Electromyography (EMG)"),
  createOption("Lumbar puncture"),
  createOption("Neuropsychological tests"),
  createOption("Obstetric / Gynaecological	Edit"),
  createOption("Amniocentesis"),
  createOption("Colposcopy"),
  createOption("Hysteroscopy"),
  createOption("Pap smears"),
  createOption("Dilated fundus examination"),
  createOption("Multifocal electroretinography (mfERG)"),
  createOption("Optical coherence tomography (OCT)"),
  createOption("Visual field test"),
  createOption("Polysomnography"),
  createOption("Pulmonary pletysmography"),
  createOption("Thoracentesis"),
  createOption("CT scan (B*2**)"),
  createOption("Magnetic resonance imaging (MRI) (B*3**)"),
  createOption("Nuclear medicine (C****)"),
  createOption("Positron-emission tomography (PET)"),
  createOption("Projectional radiography (B*0**)"),
  createOption("Ultrasonography (B*4**)"),
  createOption("Arthroscopy"),
  createOption("Cystoscopy"),
  createOption("Urodynamic testing"),
];

class DoctorView extends Component {
  handleChangee = (e) => {
    if (["medName", "medType", "endDate", "nof"].includes(e.target.name)) {
      let taskList = [...this.state.taskList];
      taskList[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = (e) => {
    this.setState((prevState) => ({
      taskList: [
        ...prevState.taskList,
        {
          index: Math.random(),
          medName: "",
          medType: "",
          endDate: "",
          nof: "",
        },
      ],
    }));
  };

  deteteRow = (index) => {
    this.setState({
      taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
    });
    // const taskList1 = [...this.state.taskList];
    // taskList1.splice(index, 1);
    // this.setState({ taskList: taskList1 });
  };
  componentWillMount() {
    this.loadBlockchainData();
  }
<<<<<<< HEAD
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const abi = Doctorabi.abi;
    var net_id = await web3.eth.net.getId(); //5777
    var ret = 0;
    var et = 0;
    if (Doctorabi.networks[net_id]) {
      const d_abi = Doctorabi.abi;
      var address = Doctorabi.networks[net_id].address;
      var doctor = await web3.eth.Contract(d_abi, address);
      this.setState({ doctor });
      ret = await this.state.doctor.methods.check(this.state.account).call();
      console.log(window.location.href.toString().split("/")[3]);
      if (
        (ret > 0) &
        ((window.location.href.toString().split("/")[3] != "Doctor_View") |
          (window.location.href.toString().split("/")[4] != ret))
      ) {
        window.location.href = "/Doctor_View/" + ret;
      } else if (ret == -1) {
        window.location.href = "/";
      } else {
        this.setState({ loading: false });
      }
=======
   componentWillMount(){
   this.loadBlockchainData()
  }
async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  const abi= Doctorabi.abi
  var net_id = await web3.eth.net.getId()//5777
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
>>>>>>> 3a4229f95cdc928f2c83dfc66887d4fc2dab73fb
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
    if (Doctorabi.networks[net_id]) {
      var address = Doctorabi.networks[net_id].address;
      var doctor = await web3.eth.Contract(abi, address);
      this.setState({ doctor });
      ret = await this.state.doctor.methods.check(this.state.account).call();
      console.log(window.location.href.toString().split("/")[3]);
      if (
        (ret > 0) &
        ((window.location.href.toString().split("/")[3] != "Doctor_View") |
          (window.location.href.toString().split("/")[4] != ret))
      ) {
        window.location.href = "/Doctor_View/" + ret;
      } else if (ret == -1) {
        window.location.href = "/";
      } else {
        this.setState({ loading: false });
        var id = window.location.href.toString().split("/")[4];
        const count = await doctor.methods.getall1(id).call();
        console.log(web3.utils.toUtf8(count[0]));
        this.setState({ info: web3.utils.toUtf8(count[0]) });
        this.setState({ hash: count[3] });
        this.setState({ name: web3.utils.toUtf8(count[0]) });
        const result = await this.state.doctor.methods.getPlen(id).call();
        var patient = await web3.eth.Contract(
          Patientabi.abi,
          Patientabi.networks[net_id].address
        );
        this.setState({ patient });

        for (var i = 0; i < result.toString(); i++) {
          const doc = await doctor.methods.getP1(i, id).call();
          const doc2 = await doctor.methods.getP2(i, id).call();

          this.setState({ patients: [...this.state.patients, doc] });
          this.setState({ patients2: [...this.state.patients2, doc2] });
          console.log(this.state.patients2);
        }
        if (result.toString() > 0) {
          this.setState({ list: false });
        } else {
          this.setState({ list: true });
        }
      }
    } else {
      window.alert("Contract not loaded to blockchain");
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
  async write(
    name,
    age,
    gender,
    aler,
    mname,
    mtype,
    sdate,
    edate,
    nof,
    pid,
    test,
    summ,
    id
  ) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    var id = window.location.href.toString().split("/")[4];
    // console.log(pid,id)
    this.state.doctor.methods
      .WriteMedication(
        web3.utils.fromAscii(name),
        aler,
        Number(pid),
        mname,
        mtype,
        test,
        web3.utils.fromAscii(sdate),
        edate,
        nof,
        summ,
        id
      )
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      })
      .once("confirmation", function() {
        NotificationManager.success(
          "Prescribtion added",
          "Check history",
          5000
        );
      });
    var p = Number(pid);
    this.setState({ p });
  }
  async ph(key) {
    var x = await this.state.patient.methods.hCount.call();
    if (document.getElementById("dlist").innerHTML == "") {
      if (x.toString() == 0) {
        document.getElementById("dlist").innerHTML =
          "No prescriptions are there yet!! \n";
      } else {
        for (var i = 1; i <= x.toString(); i++) {
          const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
          var no = await this.state.patient.methods.viewHist1(i, key).call();
          var no2 = await this.state.patient.methods.viewHist2(i, key).call();

          console.log(no, no2);
          if (no[0] !== "") {
            let tableRef = document.getElementById("dlist");
            let newRow = tableRef.insertRow(-1);
            let newCell = newRow.insertCell(0);
            newCell.setAttribute(
              "style",
              "border-stlye:solid;  text-align:left; position: relative;top: 8px;right: 16px;font-size: 18px;"
            );
            console.log(no);
            if (no[1].length > 1) {
              var s1 = "Medicines prescribed to take are: ".toString();
            } else {
              var s1 = "Medicine prescribed to take is: ".toString();
            }
            for (var j = 0; j < no2[1].length; j++) {
              s1 =
                s1 +
                (no[1][j] +
                  " as " +
                  web3.utils.toUtf8(no2[1][j]) +
                  " till " +
                  web3.utils.toUtf8(no[4][j]) +
                  " , " +
                  web3.utils.toUtf8(no[5][j]) +
                  " times a day. ");
            }
            let p = document.createTextNode(s1);
            let q = document.createTextNode(
              ("Treatment Date: " + web3.utils.toUtf8(no[3])).toString()
            );
            let r = document.createTextNode(
              ("Tests suggested:  " + no[2]).toString()
            );
            let g = document.createTextNode(
              ("Summary of treatment: " + no2[0]).toString()
            );

            newCell.appendChild(document.createElement("hr"));
            newCell.appendChild(p);
            newCell.appendChild(document.createElement("br"));
            newCell.appendChild(q);
            newCell.appendChild(document.createElement("br"));
            newCell.appendChild(r);
            newCell.appendChild(document.createElement("hr"));
            // let a=document.createTextNode(("Name: "+web3.utils.toUtf8(no[0])).toString())
            // let b=document.createTextNode(("Allergies: "+no[1]).toString());
            // let c=document.createTextNode((" Treatment details:").toString())
            // let d=document.createTextNode(("Medicine prescribed to take is: "+web3.utils.toUtf8(no[2])).toString()+" as "+web3.utils.toUtf8(no[3]) )
            // let e=document.createTextNode(("Tests suggested:  "+(no[4])).toString())
            // let f=document.createTextNode(("Medicine to be taken from "+web3.utils.toUtf8(no2[0])+" till "+web3.utils.toUtf8(no2[1])+" , "+  (no[5]) +" times a day").toString())
            // let g=document.createTextNode(("Summary of treatment: "+web3.utils.toUtf8(no2[3])).toString())
            // let h=document.createTextNode(("").toString())
            // newCell.appendChild(document.createElement("hr"));
            // newCell.appendChild(a);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(b);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(c);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(d);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(e);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(f);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(g);
            // newCell.appendChild(document.createElement("br"));
            // newCell.appendChild(h);
          }
        }
      }
    } else {
      document.getElementById("dlist").innerHTML = "";
    }
    console.log(this.state.patient);
  }

<<<<<<< HEAD
  async add(dname, mname, type, sdate, edate, nof, test, summ) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const abi = Patientabi.abi;
    var net_id = await web3.eth.net.getId(); // 5777
    if (Patientabi.networks[net_id]) {
      const address = Patientabi.networks[net_id].address;
      const patient = await web3.eth.Contract(abi, address);
      this.setState({ patient });
      console.log(dname);
      console.log(this.state.p);
      patient.methods
        .addDoc(
          web3.utils.fromAscii(dname),
          mname,
          test,
          type,
          web3.utils.fromAscii(sdate),
          edate,
          nof,
          summ,
          this.state.p
        )
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          this.setState({ loading: false });
        })
        .once("confirmation", function() {
          NotificationManager.success(
            "Patient got prescribtion",
            "Inform Patient",
            5000
          );
          window.setTimeout(function() {
            window.location.reload();
          }, 3000);
        });
=======
async add(dname,mname,type,sdate,edate,nof,test,summ){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
  const abi= Patientabi.abi
  var net_id = await web3.eth.net.getId()// 5777
  if(Patientabi.networks[net_id]){
    const address= Patientabi.networks[net_id].address
    const patient= await web3.eth.Contract(abi,address)
    this.setState({patient})
    console.log(dname)
    console.log(this.state.p)
    patient.methods.addDoc(web3.utils.fromAscii(dname),(mname),test,type,web3.utils.fromAscii(sdate),(edate),(nof),(summ),this.state.p).send({from:this.state.account}).once('receipt',(receipt)=>{ this.setState({loading:false})}).once("confirmation", function () {
      NotificationManager.success('Patient got prescribtion', 'Inform Patient',5000)
      window.setTimeout(function(){window.location.reload()}, 3000)    
    }) 
>>>>>>> 3a4229f95cdc928f2c83dfc66887d4fc2dab73fb

      // var id = window.location.href.toString().split("/")[4]
      // const result=await this.state.doctor.methods.getPlen(id).call()
    } else {
      window.alert("Contract not loaded to blockchain");
    }
  }

  async openLink(tabName) {
    var i;
    var xx = document.getElementsByClassName("data");
    for (i = 0; i < xx.length; i++) {
      xx[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    if (tabName == "history") {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      var key = window.location.href.toString().split("/")[4];
      var x = await this.state.doctor.methods.treatCount.call();

      if (document.getElementById("wheel").innerHTML == "") {
        for (var i = Number(x.toString()); i >= 1; i--) {
          console.log(i);
          var no = await this.state.doctor.methods
            .GetMedicationList1(i, key)
            .call();
          var no2 = await this.state.doctor.methods
            .GetMedicationList2(i, key)
            .call();
          // console.log(no, no2);
          if (no[1] != "") {
            let tableRef = document.getElementById("wheel");
            let newRow = tableRef.insertRow(-1);
            let newCell = newRow.insertCell(0);
            newCell.setAttribute("style", "padding: 26px; text-align: left");
            let a = document.createTextNode(
              ("Name: " + web3.utils.toUtf8(no[0])).toString()
            );
            let b = document.createTextNode(("Allergies: " + no[1]).toString());
            let c = document.createTextNode(" Treatment details:".toString());
            if (no[1].length > 1) {
              var s1 = "Medicines prescribed to take are: ".toString();
            } else {
              var s1 = "Medicine prescribed to take is: ".toString();
            }
            for (var i = 0; i < no2[1].length; i++) {
              s1 =
                s1 +
                (no[2][i] +
                  " as " +
                  web3.utils.toUtf8(no[3][i]) +
                  " till " +
                  web3.utils.toUtf8(no2[1][i]) +
                  " , " +
                  web3.utils.toUtf8(no2[2][i]) +
                  " times a day. ");
            }
            let e = document.createTextNode(s1);
            let d = document.createTextNode(
              ("Treatment Date: " + web3.utils.toUtf8(no2[0])).toString()
            );
            let f = document.createTextNode(
              ("Tests suggested:  " + no[4]).toString()
            );
            let g = document.createTextNode(
              ("Summary of treatment: " + no2[3]).toString()
            );
            let h = document.createTextNode("".toString());
            newCell.appendChild(document.createElement("hr"));
            newCell.appendChild(a);
            newCell.appendChild(document.createElement("br"));
            newCell.appendChild(b);
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
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      loading: true,
      list: true,
      info: "",
      taskList: [
        {
          index: Math.random(),
          medName: "",
          medType: "Liquid",
          endDate: "",
          nof: "1",
        },
      ],

      patients: [],
      patients2: [],
      plist: [],
      options: defaultOptions,
      value: undefined,
      showMe: false,
    };
    // this.hist = this.hist.bind(this);
  }
  clickOnDelete(record) {
    this.setState({
      taskList: this.state.taskList.filter((r) => r !== record),
    });
  }
  render() {
    const { isLoading, options, value } = this.state;
    let { taskList } = this.state; //let { notes, date, description, taskList } = this.state

    const ipfsHash = this.state.hash;
    return (
      <div>
        <div
          className={this.state.showMe ? "d-flex toggled" : "d-flex"}
          id="wrapper"
        >
          <NotificationContainer />
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">{this.state.name}</div>
            <div className="list-group list-group-flush">
              <a
                className="list-group-item list-group-item-action bg-light tablink"
                type="button"
                onClick={(e) => this.openLink("dashboard")}
              >
                Dashboard
              </a>
              <a
                className="list-group-item list-group-item-action bg-light tablink"
                type="button"
                onClick={(e) => this.openLink("appointment")}
              >
                Make an Appointment
              </a>
              <a
                className="list-group-item list-group-item-action bg-light tablink"
                type="button"
                onClick={(e) => this.openLink("report")}
              >
                Reports
              </a>
              <a
                className="list-group-item list-group-item-action bg-light tablink"
                type="button"
                onClick={(e) => this.openLink("profile")}
              >
                Profile
              </a>
              <a
                className="list-group-item list-group-item-action bg-light tablink"
                type="button"
                onClick={(e) => this.openLink("history")}
              >
                History
              </a>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button
                className="btn btn-primary"
                id="menu-toggle"
                onClick={() => this.setState({ showMe: !this.state.showMe })}
              >
                Toggle Menu
              </button>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item active">
                    <a className="nav-link" href="">
                      {this.state.account}
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            {this.state.loading ? (
              <div id="loader" className="text-center ">
                <h1 className="text-center">Loading..</h1>
              </div>
            ) : (
              <div>
                <div
                  className="container-fluid data animate-right"
                  id="dashboard"
                >
                  <h1 className="mt-4">Requests will be shown below</h1>
                  <div className="col">
                    {this.state.list ? (
                      <div>
                        <h3>No requests yet</h3>
                      </div>
                    ) : (
                      <ul style={{ listStyleType: "none" }}>
                        {this.state.patients.map((patient, key) => {
                          return (
                            <li key={key}>
                              <hr></hr>

                              <div>
                                <div className="card">
                                  <h4 id="print">
                                    {patient._name}({patient._age.toString()}{" "}
                                    years old) is {patient._gender} with blood
                                    group {patient._bg}
                                  </h4>
                                  <h4>
                                    Allergies from: {this.state.patients2[key]}
                                  </h4>
                                  <div
                                    style={{ display: "flex", padding: "20px" }}
                                  >
                                    <button
                                      style={{ marginLeft: "auto" }}
                                      className="btn btn-primary"
                                      onClick={(e) => this.ph(patient[5])}
                                      title="View Patient History"
                                    >
                                      View Patient History
                                    </button>
                                  </div>
                                  <form
                                    id="form1"
                                    onChange={this.handleChangee}
                                    onSubmit={(event) => {
                                      this.setState({ loading: true });
                                      event.preventDefault();

                                      // const mname=this.mname.value
                                      // const mtype=this.mtype.value
                                      // const sdate=this.sdate.value
                                      // const edate=this.edate.value
                                      // const nof=this.nof.value
                                      const summ = this.summ.value;
                                      var aler = this.state.patients2[key];
                                      // if(this.state.patients2[key].length!=0){
                                      //   for(var i=0;i<this.state.patients2[key].length;i++){
                                      //     aler=aler+this.state.patients2[key][i].toString()
                                      //     if(i!=this.state.value.length-1){
                                      //       aler=aler+", "
                                      //     }
                                      //   }
                                      // }
                                      // else{
                                      //   aler="None"
                                      // }
                                      var test = "";
                                      console.log(this.state.value);
                                      if (this.state.value != undefined) {
                                        for (
                                          var i = 0;
                                          i < this.state.value.length;
                                          i++
                                        ) {
                                          console.log(
                                            this.state.value[i].label
                                          );
                                          test =
                                            test +
                                            this.state.value[
                                              i
                                            ].label.toString();
                                          if (
                                            i !=
                                            this.state.value.length - 1
                                          ) {
                                            test = test + ", ";
                                          }
                                        }
                                      } else {
                                        test = "None";
                                      }
                                      // const doc=this.state.doctor.geta
                                      console.log(this.state.taskList);
                                      var nof = [];
                                      var medName = [];
                                      var medType = [];
                                      var endDate = [];
                                      const web3 = new Web3(
                                        Web3.givenProvider ||
                                          "http://localhost:7545"
                                      );

                                      for (
                                        var q = 0;
                                        q <= this.state.taskList.length - 1;
                                        q++
                                      ) {
                                        nof.push(
                                          web3.utils.fromAscii(
                                            this.state.taskList[q].nof
                                          )
                                        );
                                        medName.push(
                                          this.state.taskList[q].medName
                                        );
                                        medType.push(
                                          web3.utils.fromAscii(
                                            this.state.taskList[q].medType
                                          )
                                        );
                                        endDate.push(
                                          web3.utils.fromAscii(
                                            this.state.taskList[q].endDate
                                          )
                                        );
                                      }
                                      let newDate = new Date();
                                      let date = newDate.getDate();
                                      let month = newDate.getMonth() + 1;
                                      let year = newDate.getFullYear();
                                      var sdate = `${year}${"-"}${
                                        month < 10 ? `0${month}` : `${month}`
                                      }${"-"}${
                                        date < 10 ? `0${date}` : `${date}`
                                      }`;
                                      this.write(
                                        patient._name,
                                        patient._age,
                                        patient._gender,
                                        aler,
                                        medName,
                                        medType,
                                        sdate,
                                        endDate,
                                        nof,
                                        patient._pid.toString(),
                                        test,
                                        summ,
                                        key
                                      );
                                      this.add(
                                        this.state.info,
                                        medName,
                                        medType,
                                        sdate,
                                        endDate,
                                        nof,
                                        test,
                                        summ
                                      );
                                    }}
                                  >
                                    <table id="dlist"></table>
                                    <hr />
                                    <div className="form-group text-center">
                                      <label htmlFor="type">
                                        Suggest tests
                                      </label>
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
                                        ref={(input) => {
                                          this.aler = input;
                                        }}
                                      />
                                    </div>
                                    {/* { this.setmindate()} */}
                                    {/* <p className="text-danger" id="error"></p> */}
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <td className="required">
                                            Medicine to take (Name)
                                          </td>
                                          <td className="required">
                                            In form of
                                          </td>
                                          <td className="required">
                                            Number of times a day to take
                                          </td>
                                          <td className="required">
                                            To be taken till{" "}
                                          </td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <TaskList
                                          add={this.addNewRow}
                                          delete={this.clickOnDelete.bind(this)}
                                          taskList={taskList}
                                        />
                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <td colSpan="4">
                                            <button
                                              onClick={this.addNewRow}
                                              type="button"
                                              className="btn btn-primary text-center"
                                            >
                                              <i
                                                className="fa fa-plus-circle"
                                                aria-hidden="true"
                                              ></i>
                                            </button>
                                          </td>
                                        </tr>
                                      </tfoot>
                                    </table>

                                    {/* <div className="form-group text-center" data-provide="datepicker">
                                        <label htmlFor="Start Date">Start taking medicines from</label><br/>
                                        <input type="date" id="ssdate" required ref={(input) => {this.sdate=input}}/>
                                      </div> */}

                                    <div className="form-group text-center">
                                      <label htmlFor="type">
                                        Summary for medication
                                      </label>
                                      <textarea
                                        type="text"
                                        className="form-control"
                                        id="summ"
                                        required
                                        ref={(input) => {
                                          this.summ = input;
                                        }}
                                      ></textarea>
                                    </div>
                                    <button
                                      id="button"
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Submit
                                    </button>
                                  </form>
                                </div>{" "}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
                <div
                  className="container-fluid data animate-right"
                  id="appointment"
                  style={{ display: "none" }}
                >
                  <h1>Appointment</h1>
                  <p>
                    The starting state of the menu will appear collapsed on
                    smaller screens, and will appear non-collapsed on larger
                    screens. When toggled using the button below, the menu will
                    change.
                  </p>
                  <p>
                    Make sure to keep all page content within the{" "}
                    <code>#page-content-wrapper</code>. The top navbar is
                    optional, and just for demonstration. Just create an element
                    with the <code>#menu-toggle</code> ID which will toggle the
                    menu when clicked.
                  </p>
                </div>
                <div
                  className="container-fluid data animate-right"
                  id="report"
                  style={{ display: "none" }}
                >
                  <h1>Reports</h1>
                  <p>
                    The starting state of the menu will appear collapsed on
                    smaller screens, and will appear non-collapsed on larger
                    screens. When toggled using the button below, the menu will
                    change.
                  </p>
                  <p>
                    Make sure to keep all page content within the{" "}
                    <code>#page-content-wrapper</code>. The top navbar is
                    optional, and just for demonstration. Just create an element
                    with the <code>#menu-toggle</code> ID which will toggle the
                    menu when clicked.
                  </p>
                </div>
                <div
                  className="container-fluid data animate-right"
                  id="profile"
                  style={{ display: "none" }}
                >
                  <h1>Profile</h1>
                  <div id="box" className="col">
                    <h1 className="text-center">Your Bio</h1>
                    <div className="row">
                      <div className="col-sm-6">
                        <h4> Name : </h4>
                      </div>
                      <div className="col-sm-6">
                        <h4 id="name">{this.state.name}</h4>
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
                <div
                  className="container-fluid data animate-right"
                  id="history"
                  style={{ display: "none" }}
                >
                  <h1>History</h1>
                  {/* <button id="button"  onClick={this.hist} className="btn btn-primary">History</button> */}
                  <table id="wheel"></table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorView;
