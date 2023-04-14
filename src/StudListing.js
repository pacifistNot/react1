import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudListing = () => {
    const [studdata, studdatachange] = useState([]);

    const navigate = useNavigate();

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [surname, surnamechange] = useState("");
    const [date, datechange] = useState("");
    const [group, groupchange] = useState("");
    const [point, pointchange] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/student").then((res) => {
            return res.json();
        }).then((resp) => {
            studdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    

    // ПОКАЗАТЬ ЕЩЕ
    const [noOfElement, setnoOfElement] = useState(10);
    const LoadMore = () => {
        setnoOfElement(noOfElement + noOfElement);
    }
    const slice = studdata.slice(0, noOfElement);


    // ПЕРЕВОД НА СТРАНИЦУ С ПОЛНОЙ ИНФОРМАЦИЕЙ
    const StudDetail = (id) => {
        navigate("/student/detail/" + id);
    }


    // ФУНКЦИЯ УДАЛЕНИЯ
    const Removefunction = (id) => {
        fetch("http://localhost:8000/student/" + id, {
            method: "DELETE"
        }).then((res) => {
            window.location.reload();
        })
    }


    // ФУНКЦИЯ ДОБАВЛЕНИЯ
    const handleAdd = (e) => {      

        e.preventDefault();
        const studdata = { name, surname, date, group, point };
        fetch("http://localhost:8000/student/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(studdata)
        }).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }


    // ФУНКЦИЯ РЕДАКТИРОВАНИЯ
    const handlesubmit = (e) => {
        e.preventDefault();
        const studdata = { id, name, surname, date, group, point };

        fetch("http://localhost:8000/student/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(studdata)
        }).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }

    function func(data) {
        const { id, name, surname, date, group, point } = data
        idchange(id)
        namechange(name)
        surnamechange(surname)
        datechange(date)
        groupchange(group)
        pointchange(point)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Список студентов</h2>
                </div>
                <div className="card-body">
                    <div className="card__body__up">
                        <button type="button" className="btn btn-success btn__add__stud" data-toggle="modal" data-target="#add">
                            Добавить студента (+)
                        </button>
                    </div>
                    <table className="table table-border">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td className="list__item__id">ID</td>
                                <td>Имя</td>
                                <td>Фамилия</td>
                                <td>Дата рождения</td>
                                <td>Группа</td>
                                <td>Средний Балл</td>
                                <td>Действие</td>
                            </tr>
                        </thead>
                        <tbody>

                            {slice &&
                                slice.map((item, id) => (
                                    <tr key={id}>
                                        <td className="list__item__id">{item.id}</td>
                                        <td><a className="Detail__link" onClick={() => { StudDetail(item.id) }}>{item.name}</a></td>
                                        <td><a className="Detail__link" onClick={() => { StudDetail(item.id) }}>{item.surname}</a></td>
                                        <td>{item.date}</td>
                                        <td>{item.group}</td>
                                        <td>{item.point}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" onClick={() => func(item)} data-toggle="modal" data-target="#exampleModal">Редактировать</button>
                                            <button className="btn btn-danger" onClick={() => { Removefunction(item.id) }}>Удалить</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={() => LoadMore()}>Показать еще</button>

                    <div className="modal fade" id="add" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="exampleModalLabel">Добавить студента</h3>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleAdd}>
                                        <div className="form-group list__item__id">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Имя</label>
                                            <input required type="text" value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Фамилия</label>
                                            <input required type="text" value={surname} onChange={e => surnamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Дата рождения</label>
                                            <input required type="date" value={date} onChange={e => datechange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Группа</label>
                                            <input required type="text" value={group} onChange={e => groupchange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Средний балл</label>
                                            <input type="number" value={point} onChange={e => pointchange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-success" type="submit">Сохранить</button>
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Закрыть</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="exampleModalLabel">Редактировать данные студента</h3>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handlesubmit}>
                                        <div className="form-group list__item__id">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Имя</label>
                                            <input required type="text" value={name}  onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Фамилия</label>
                                            <input required type="text" value={surname} onChange={e => surnamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Дата рождения</label>
                                            <input required type="date" value={date} onChange={e => datechange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Группа</label>
                                            <input required type="text" value={group} onChange={e => groupchange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Средний балл</label>
                                            <input type="number" value={point} onChange={e => pointchange(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-success" type="submit">Сохранить</button>
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Закрыть</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudListing;