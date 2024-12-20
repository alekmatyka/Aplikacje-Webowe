import React from 'react';


interface Student{
    name: string,
    surname: string,
    year: number
}

const Studenci = () => {

    const Students:Student[] = [
        { name:"Hyzio" , surname:"McKwacz" , year: 2005 },
        { name:"Dyzio", surname: "McKwacz", year: 2005},
        { name:"Zyzio", surname: "McKwacz", year: 2005},
        { name:"Donald", surname: "Kaczor", year: 1989}
    ]


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
            
        </div>
    );
};

export default Studenci;