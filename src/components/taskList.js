import React from "react"
const TaskList = (props) => {
  return (
    props.taskList.map((val, idx) => {     
      let medName = `medName-${idx}`, medType = `medType-${idx}`, endDate = `endDate-${idx}`, nof = `nof-${idx}`
      return (
        <tr key={val.index}>
          <td>
            <input required type="text"  name="medName" data-id={idx} id={medName} className="form-control " />
          </td>
          <td>
            <div className="form-group text-center"> 
                <select  name="type" name="medType" id={medType} data-id={idx} className="form-control"  >
                    <option value="Liquid"defaultValue>Liquid</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                </select>
            </div>
          </td>
          <td>
          <div className="form-group text-center"> 
            <select   name="nof" id={nof} data-id={idx} className="form-control"   >
                <option defaultValue value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                
            </select>
            </div>
          </td>
          <td>
            <div className="form-group text-center" data-provide="datepicker">
                <input required type="date" name="endDate" id={endDate} data-id={idx} className="form-control"/>
            </div>
          </td>
          <td>
           
          </td>
          <td>
            {
            idx===0?<button  onClick={()=>props.add()} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            : <button  className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
            }
          </td>
        </tr >
      )
    })
  )
}
export default TaskList