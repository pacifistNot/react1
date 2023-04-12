import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const StudDetails = () => {
    const { studid } = useParams();

    const [studdata, studdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/student/" + studid).then((res) => {
            return res.json();
        }).then((resp) => {
            studdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            <div className="container">
                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Информация о студенте</h2>
                    </div>
                    <div className="card-body"></div>

                    {studdata &&
                        <div>
                            <h2>Имя : {studdata.name}</h2>
                            <h2>Фамилия : {studdata.surname}</h2>
                            <h5>Дата рождения : {studdata.date}</h5>
                            <h5>Группа : {studdata.group}</h5>
                            <h5>Средний балл : {studdata.point}</h5>
                            <Link className="btn btn-danger" to="/">Назад</Link>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default StudDetails;