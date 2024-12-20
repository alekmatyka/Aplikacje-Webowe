import React, { useEffect, useState } from 'react';

const Dodawanie = (props:any) => {

       const addStudent = props.addStudent
       const currentDate = new Date();

       const [name,setName] = useState("") 
       const [surname,setSurname] = useState("") 
       const [year,setYear] = useState(NaN) 
       const [disableButton, setDisabled] = useState(true)

        useEffect(()=>{
            if(name.length==0 || surname.length==0 || year>currentDate.getFullYear() || isNaN(year)){
                setDisabled(true)
            }else{
                setDisabled(false)
            }
    
        })

        function resetStudent(){
            setName("")
            setSurname("")
            setYear(NaN)
        }

    return (
        <div>
            Imie:
            <input type='text' value={name} onChange={(e:any)=>{setName(e.target.value)}}/>
            <br/>
            Nazwisko:
            <input type='text' value={surname} onChange={(e:any)=>{setSurname(e.target.value)}}/>
            <br/>
            Rok:
            <input type='number' value={year} onChange={(e:any)=>{setYear(e.target.value)}}/>
            <br/>
            
            <button onClick={()=>{addStudent(name,surname,year);resetStudent()}} disabled={disableButton}>Dodaj</button>

        </div>
    );
};

export default Dodawanie;