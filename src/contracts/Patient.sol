
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Patient{
    uint public patientCount = 0;
    uint public hCount=0;
    mapping(uint=>address) public adr;
    mapping(address => Info) public info;
    mapping(uint => History) public history;
    mapping(uint => Report[]) public report;
    mapping(uint => ReportName[])public reportname;

  struct Report{
        string report;
    }
    struct ReportName{
        string reportname;
    }
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
        string dname;
        string[] medicine;
        string  test;
        bytes32 sdate;
        bytes32[] typ;
        bytes32[] edate;
        bytes32[] nof;
        string summ;
        uint pid;
    }
    function addDoc(string memory _dname,string[] memory _medicine,string memory _test,bytes32[] memory _typ,
    bytes32 _sdate,bytes32[] memory _edate,bytes32[] memory _nof,string memory _summ,uint _pid) public{
        hCount++;
        history[hCount] = History(hCount,_dname,_medicine,_test,_sdate,_typ,_edate,_nof,_summ,_pid);
    }
function viewHist1(uint i,uint _p) public view returns(string memory _dname,string[] memory _medicine,string memory _test,
bytes32 _sdate,bytes32[] memory _edate,bytes32[] memory _nof,uint _hCount){
    if(_p==history[i].pid){
            return(history[i].dname,history[i].medicine,history[i].test,history[i].sdate,history[i].edate,history[i].nof,hCount);
        }
    }
    function viewHist2(uint i,uint _p) public view returns(string memory _summ,bytes32[] memory _typ){
    if(_p==history[i].pid){
            return(history[i].summ,history[i].typ);
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
    function addrep(uint  i,string memory _repname,string memory _rep) public {
        report[i].push(Report(_rep));
        reportname[i].push(ReportName(_repname));
    }
    function viewrep(uint i,uint j)public view returns(string memory _repname,string memory _rep){
        return(reportname[i][j].reportname,report[i][j].report);
    }
    function replen(uint i)public view returns(uint _i){
        return(report[i].length);
    }
}