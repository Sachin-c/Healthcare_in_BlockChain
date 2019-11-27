
pragma solidity ^0.5.0;
import './Patient.sol';
contract Doctor{
    uint public doctorCount = 0;
    uint public treatCount = 0;
   address addressP;
    uint public p;
    mapping(uint => Info) public info;
    mapping(uint => PatientList) public patientlist;
     mapping(uint => WaitList[]) waitlist;
    struct WaitList{
        uint wait;
    }
    struct PatientList{
        uint pid;
        string name;
        uint age;
        string gender;
        string bg;
        bytes32 medname;
        bytes32 medtype;
        bytes32 sdate;
        bytes32 edate;
        bytes32 nof;
        uint did;
    }
    struct Info{
    uint id;
    string name;
    uint age;
    string gender;
    }
    function WriteMedication(string memory _name, uint _age, string memory _gender, string memory _bg,uint _pid,bytes32 _medname,
     bytes32 _medtype,bytes32 _sdate,bytes32 _edate,bytes32 _nof,uint _did ) public{
        treatCount++;
        patientlist[treatCount] = PatientList(treatCount,_name,_age,_gender,_bg,_medname,_medtype,_sdate,_edate,_nof,_did);
        for(uint i = 0;i<waitlist[_did].length-1;i++){
            if(waitlist[_did][i].wait==_pid){
                waitlist[_did][i].wait = waitlist[_did][waitlist[_did].length-1].wait;
            }
        }
        waitlist[_did].pop();
    }
    function GetMedicationList(uint _id,uint _key)public view returns(string memory _name,bytes32 _medname, bytes32 _medtype,
     bytes32 _sdate, bytes32 _edate, bytes32 _nof,uint _treatCount){
         if(_key==patientlist[_id].did)
        return(patientlist[_id].name,patientlist[_id].medname,patientlist[_id].medtype,patientlist[_id].sdate,
        patientlist[_id].edate,patientlist[_id].nof,treatCount);
    }
    function setp(uint _p_id,uint _key) public {
     waitlist[_key].push(WaitList(_p_id));
    }
function getPlen (uint _key) external view returns(uint count) {
        return (waitlist[_key].length);
 }
 function getP (uint _id,uint _key) external view returns(string memory _name, uint _age, string memory _gender,
  string memory _bg,uint _patientCount,uint _pid) {
       Patient myPatient = Patient(addressP);
        return (myPatient.getall(waitlist[_key][_id].wait));
 }
 function setAddressB(address _address) external{
     addressP = _address;
 }
 function getAddressB() public view returns(address a){
     return(addressP);
 }
    function set(string memory _name, uint _age, string memory _gender) public {
        doctorCount++;
        info[doctorCount] = Info(doctorCount, _name,_age,_gender);
    }
    function get() public view returns(string memory _name, uint _age, string memory _gender){
    return (info[doctorCount].name, info[doctorCount].age, info[doctorCount].gender) ;
    }
    function getall(uint i) public view returns(string memory _name, uint _age, string memory _gender,uint _doctorCount){
        return (info[i].name, info[i].age, info[i].gender,doctorCount);
    }
}