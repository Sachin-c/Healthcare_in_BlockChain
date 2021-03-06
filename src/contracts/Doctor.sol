pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import './Patient.sol';
contract Doctor{
    uint public doctorCount = 0;
    uint public treatCount = 0;
   address addressP;
    uint public p;
    mapping(uint=>address) public adr;
    mapping(address => Info) public info;
    mapping(uint => PatientList) public patientlist;
     mapping(uint => WaitList[]) waitlist;
     mapping(uint => WaitListAddress[]) waitlist_add;
    struct WaitList{
        uint wait;
    }
    struct WaitListAddress{
        address add;
    }
    struct PatientList{
        uint pid;
        bytes32 name;
        string aler;
        string[] medname;
        bytes32[] medtype;
        bytes32[] edate;
        bytes32[] nof;
        string test;
        bytes32 sdate;
        string summ;
        uint did;
    } string medname;
    struct Info{
    uint id;
    bytes32 name;
    bytes32 spec;
    uint exp;
    string add;
    bytes32 timingfrom;
    bytes32 timingtill;
    bytes32 gender;
    string ipfshash;
    }
    function WriteMedication(bytes32 _name, string memory _aler,uint _pid,string[] memory _medname,bytes32[] memory _medtype,
    string memory _test,bytes32 _sdate,bytes32[] memory _edate,bytes32[] memory _nof,string memory _summ,uint _did ) public{
        treatCount++;

        patientlist[treatCount] = PatientList(treatCount,_name,_aler,_medname,_medtype,_edate,_nof,_test,_sdate,_summ,_did);
        for(uint i = 0;i<waitlist[_did].length-1;i++){
            if(waitlist[_did][i].wait==_pid){
                waitlist[_did][i].wait = waitlist[_did][waitlist[_did].length-1].wait;
                waitlist_add[_did][i].add = waitlist_add[_did][waitlist_add[_did].length-1].add;
            }
        }
        waitlist[_did].pop();
        waitlist_add[_did].pop();
    }
    function GetMedicationList1(uint _id,uint _key)public view returns(bytes32 _name,string memory _aler,
    string[] memory _medname, bytes32[] memory _medtype,string memory _test,uint _treatCount){
         if(_key==patientlist[_id].did)
        return(patientlist[_id].name,patientlist[_id].aler,patientlist[_id].medname,patientlist[_id].medtype,patientlist[_id].test,treatCount);
    }
     function GetMedicationList2(uint _id,uint _key)public view returns(bytes32 _sdate, bytes32[] memory _edate, bytes32[] memory _nof,
     string memory _summ,uint _treatCount){
         if(_key==patientlist[_id].did)
        return(patientlist[_id].sdate,patientlist[_id].edate,patientlist[_id].nof,patientlist[_id].summ,treatCount);
    }
    function setp(uint _p_id,uint _key, address _address) public {
     waitlist[_key].push(WaitList(_p_id));
     waitlist_add[_key].push(WaitListAddress(_address));
    }
function getPlen (uint _key) external view returns(uint count) {
        return (waitlist[_key].length);
 }
 function getP1 (uint _id,uint _key) external view returns(string memory _name, uint _age, string memory _gender,
  string memory _bg,uint _patientCount,uint _pid) {
       Patient myPatient = Patient(waitlist_add[_key][_id].add);
        return (myPatient.getall1(waitlist[_key][_id].wait));
 }
  function getP2 (uint _id,uint _key) external view returns(string memory _aler) {
       Patient myPatient = Patient(waitlist_add[_key][_id].add);
        return (myPatient.getall2(waitlist[_key][_id].wait));
 }
 function setAddressB(address _address) external{
     addressP = _address;
 }
 function getAddressB() public view returns(address a){
     return(addressP);
 }
    function set(bytes32 _name,bytes32 _spec, uint _exp, string memory _add,bytes32 _timingfrom,
    bytes32 _timingtill,bytes32 _gender,address _address,string memory _ipfshash) public {
        doctorCount++;
        adr[doctorCount] = _address;
        info[_address] = Info(doctorCount, _name,_spec,_exp,_add,_timingfrom,_timingtill,_gender,_ipfshash);
    }
    function check(address s) public view returns(int t){
        if(doctorCount==0){
            return -1;
        }
        for(uint i = 1; i <= doctorCount ;i++){
            if(s==adr[i]){
                return int(i);
            }
        }
        return -1;
    }
    function checkwait(uint _did,uint _d) public view returns(int t){
        if(waitlist[_did].length==0){
            return 1;
        }
        for(uint i = 0; i <= waitlist[_did].length-1 ;i++){
            if(waitlist[_did][i].wait==_d){
                return 0;
            }
        }
        return 1;
    }
    // function get() public view returns(string memory _name, uint _age, string memory _gender){
    // return (info[doctorCount].name, info[doctorCount].age, info[doctorCount].gender) ;
    // }
    // function getall(uint i) public view returns(string memory _name, uint _age, string memory _gender,uint _doctorCount){
    //     return (info[adr[i]].name, info[adr[i]].exp, info[adr[i]].gender,doctorCount);
    // }
    function getall1(uint i) public view returns(bytes32 _name, bytes32 _spec,uint _exp,string memory _ipfhash,uint _doctorCount){
        return (info[adr[i]].name,
        info[adr[i]].spec,
        info[adr[i]].exp,
        info[adr[i]].ipfshash,
        doctorCount);
    }
    function getall2(uint i) public view returns(string memory add,
    bytes32 _timingfrom,bytes32 _timingtill,uint _doctorCount){
        return (
        info[adr[i]].add,
        info[adr[i]].timingfrom,
        info[adr[i]].timingtill,
        doctorCount);
    }
}