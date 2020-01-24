
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
     function set(string memory _name, uint _age, string memory _gender,string memory _bg, address _address) public {
        patientCount++;
        adr[patientCount] = _address;
        info[_address] = Info(patientCount, _name,_age,_gender,_bg);
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
    function getall(uint i) public view returns(string memory _name, uint _age, string memory _gender, string memory _bg,
    uint _patientCount,uint id){
    return (info[adr[i]].name, info[adr[i]].age, info[adr[i]].gender,info[adr[i]].bg,patientCount,info[adr[i]].id);
    }
}