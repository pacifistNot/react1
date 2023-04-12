import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const StudCreate = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[surname,surnamechange]=useState("");
    const[date,datechange]=useState("");
    const[group,groupchange]=useState("");
    const[point,pointchange]=useState("");

    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const studdata={name,surname,date,group,point};
      

      fetch("http://localhost:8000/student",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(studdata)
      }).then((res)=>{
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Employee Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                            {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Surname</label>
                                            <input value={surname} onChange={e=>surnamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input value={date} onChange={e=>datechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Group</label>
                                            <input value={group} onChange={e=>groupchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Point</label>
                                            <input value={point} onChange={e=>pointchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default StudCreate;