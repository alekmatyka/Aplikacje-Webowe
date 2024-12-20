import React, { useState } from 'react';
import Dodawanie from './Dodawanie';

interface Student{
    name: string,
    surname: string,
    year: number
}


const StudentManager = () => {

    const [Students,setStudents] = useState([
        { name:"Hyzio" , surname:"McKwacz" , year: 2005 },
        { name:"Dyzio", surname: "McKwacz", year: 2005},
        { name:"Zyzio", surname: "McKwacz", year: 2005},
        { name:"Donald", surname: "Kaczor", year: 1989}
    ])
    
    const addStudent = (n:string,s:string,y:number)=>{
        console.log("hejo")
        const newStudnet: Student = {name:n,surname:s,year:y}
       setStudents(([...Students,newStudnet]))
    }

    

    return (
        <div>
            <table>
                <tr>
                    <td>Imie</td>
                    <td>Nazwisko</td>
                    <td>Rocznik</td>
                </tr>
                {Students.map((student)=>{
                    return(
                        <tr>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.year}</td>
                        </tr>
                    )
                })}                
            </table>
            <br/>
            <Dodawanie addStudent={addStudent}/>
        </div>
    );
};

export default StudentManager;