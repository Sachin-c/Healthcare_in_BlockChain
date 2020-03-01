
pragma solidity ^0.5.0;

contract Patient{
    uint public patientCount = 0;
    uint public hCount=0;
    mapping(uint=>address) public adr;
    mapping(address => Info) public info;
    mapping(uint => History) public history;
    struct Info{
    uint id;
    string name;
    uint age;
    string gender;
    string aler;
    string bg;
    }
    struct History{
        uint id;
        bytes32 dname;
        bytes32 medicine;
        bytes32 test;
        bytes32 sdate;
        bytes32 edate;
        bytes32 nof;
        bytes32 summ;
        uint pid;
    }
    function addDoc(bytes32 _dname,bytes32 _medicine,bytes32 _test,bytes32 _sdate,bytes32 _edate,
        bytes32 _nof,bytes32 _summ,uint _pid) public{
        hCount++;
        history[hCount] = History(hCount,_dname,_medicine,_test,_sdate,_edate,_nof,_summ,_pid);
    }
function viewHist1(uint i,uint _p) public view returns(bytes32 _dname,bytes32 _medicine,bytes32 _test,bytes32 _sdate,
bytes32 _edate,bytes32 _nof,uint _hCount){
    if(_p==history[i].pid){
            return(history[i].dname,history[i].medicine,history[i].test,history[i].sdate,history[i].edate,history[i].nof,hCount);
        }
    }
    function viewHist2(uint i,uint _p) public view returns(bytes32 _summ){
    if(_p==history[i].pid){
            return(history[i].summ);
        }
    }
     function set(string memory _name, uint _age, string memory _gender,string memory _aler,string memory _bg, address _address) public {
        patientCount++;
        adr[patientCount] = _address;
        info[_address] = Info(patientCount, _name,_age,_gender,_aler,_bg);
    }
    // function get() public view returns(string memory _name, uint _age, string memory _gender, string memory _bg){
    // return (info[patientCount].name, info[patientCount].age, info[patientCount].gender,info[patientCount].bg) ;
    // }
    function check(address s) public view returns(int t){
        if(patientCount==0){
            return -1;
        }
        for(uint i = 1; i <= patientCount;i++){
            if(s==adr[i]){
                return int(i);
            }
        }
        return -1;
    }
    function getall1(uint i) public view returns(string memory _name, uint _age, string memory _gender, string memory _bg,
    uint _patientCount,uint id){
    return (info[adr[i]].name, info[adr[i]].age, info[adr[i]].gender,info[adr[i]].bg,patientCount,info[adr[i]].id);
    }
    function getall2(uint i) public view returns(string memory _aler){
    return (info[adr[i]].aler);
    }
}