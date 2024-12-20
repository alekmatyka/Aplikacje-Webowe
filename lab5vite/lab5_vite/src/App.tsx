//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Licznik2 from './components/efekty/Licznik2'
import Odliczanie from './components/efekty/Odliczanie'
import Tytul from './components/efekty/Tytul'
import Formularz from './components/formularze/Formularz'
import Haslo from './components/formularze/Haslo'
import Logowanie from './components/formularze/Logowanie'
import Aktualizacja from './components/inne/Aktualizacja'
import Ternary from './components/inne/Ternary'
import Koszyk from './components/Koszyk/Koszyk'
//import Produkt from './components/Koszyk/Produkt'
import NowyKoszyk from './components/Koszyk/NowyKoszyk'
import Licznik from './components/liczniki/Licznik'
import NowyLicznik from './components/liczniki/NowyLicznik'
import Komentarze from './components/produkty/Komentarze'
import Studenci from './components/studenci/Studenci'
import StudentManager from './components/studenci/StudentManager'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <h1>Zadanie 1.1</h1>
      <Koszyk/>
      <br></br>
      <h1>Zadanie 1.2</h1>
      <NowyKoszyk/>
      <h1>Zadanie 2.1</h1>
      <Licznik/>
      <h1>Zadanie 2.2</h1>
      <NowyLicznik/>
      <h1>Zadanie 3.1</h1>
      <Formularz/>
      <h1>Zadanie 3.2</h1>
      <Haslo/>
      <h1>Zadanie 3.3</h1>
      <Logowanie/>
      <h1>Zadanie 4.1</h1>
      <Ternary/>
      <h1>Zadanie 4.2</h1>
      <Aktualizacja/>
      <h1>Zadanie 5.1</h1>
      <Studenci/>
      <h1>Zadanie 5.2</h1>
      <StudentManager/>
      <h1>Zadanie 6.1</h1>
      <Licznik2/>
      <h1>Zadanie 6.2</h1>
      <Tytul/>
      <h1>Zadanie 6.3</h1>
      <Odliczanie/>
      <h1>Zadanie 7.1</h1>
      <Komentarze/>


    </>
  )
}

export default App
