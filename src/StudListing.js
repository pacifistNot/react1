
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const StudListing = () => {
    const [studdata, studdatachange] = useState([]);
    
    const navigate = useNavigate();

    const StudDetail = (id) => {
        navigate("/student/detail/" + id);
    }
    const Removefunction = (id) => {
        fetch("http://localhost:8000/student/" + id, {
            method: "DELETE"
        }).then((res) => {
            window.location.reload();
        })
    }
    const StudEdit = (id) => {
        navigate("/student/edit/" + id);
    }


    useEffect(() => {
        fetch("http://localhost:8000/student").then((res) => {
            return res.json();
        }).then((resp) => {
            studdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Список студентов</h2>
                </div>
                <div className="card-body">
                    <div>
                        <Link to="student/create" className="btn btn-success btn__add__stud">Добавить студента</Link>
                    </div>
                    <table className="table table-border">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Имя</td>
                                <td>Фамилия</td>
                                <td>Дата рождения</td>
                                <td>Группа</td>
                                <td>Средний Балл</td>
                                <td>Действие</td>
                            </tr>
                        </thead>
                        <tbody>

                            {studdata &&
                                studdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td><a className="Detail__link" onClick={() => { StudDetail(item.id) }}>{item.name}</a></td>
                                        <td><a className="Detail__link" onClick={() => { StudDetail(item.id) }}>{item.surname}</a></td>
                                        <td>{item.date}</td>
                                        <td>{item.group}</td>
                                        <td>{item.point}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => { StudEdit(item.id) }}>Редактировать</button>
                                            <button className="btn btn-danger" onClick={() => { Removefunction(item.id) }}>Удалить</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudListing;