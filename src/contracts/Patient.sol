
pragma solidity ^0.5.0;

contract Patient{
    uint public patientCount = 0;
    uint public hCount=0;
    mapping(uint => Info) public info;
    mapping(uint => History) public history;
    struct Info{
    uint id;
    string name;
    uint age;
    string gender;
    string bg;
    }
    struct History{
        uint id;
        string dname;
        string medicine;
        string sdate;
        string edate;
        string nof;
        uint pid;
    }
    function addDoc(string memory _dname,string memory _medicine, string memory _sdate, string memory _edate, string memory _nof,
    uint _pid) public{
        hCount++;
        history[hCount] = History(hCount,_dname,_medicine,_sdate,_edate,_nof,_pid);
    }
function viewHist(uint i,uint _p) public view returns(string memory _dname,string memory _medicine, string memory _sdate,
string memory _edate, string memory _nof,uint _hCount){
    if(_p==history[i].pid){
            return(history[i].dname,history[i].medicine,history[i].sdate,history[i].edate,history[i].nof,hCount);
        }
    }
    function set(string memory _name, uint _age, string memory _gender,string memory _bg) public {
        patientCount++;
        info[patientCount] = Info(patientCount, _name,_age,_gender,_bg);
    }
    function get() public view returns(string memory _name, uint _age, string memory _gender, string memory _bg){
    return (info[patientCount].name, info[patientCount].age, info[patientCount].gender,info[patientCount].bg) ;
    }
    function getall(uint i) public view returns(string memory _name, uint _age, string memory _gender, string memory _bg,
    uint _patientCount,uint id){
    return (info[i].name, info[i].age, info[i].gender,info[i].bg,patientCount,info[i].id);
    }
}