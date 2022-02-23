import { useState, useEffect, useRef } from 'react'
import "./App.css";
import { getList, setItem } from "./services/list"

function App() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState('')
  const [alert, setAlert] = useState(false)
  let mounted = useRef(true);
  
  useEffect(() => {
    if (list.length && !alert) {
      return;
    }
    getList()
      .then(items => {
        if (mounted.current) {
          setList(items)
        }
      })
    return () => mounted.current = false;
  },[alert, list])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      },1000)
    }
  },[alert])

  const handleSubmit = (event) => {
    event.preventDefault()
    setItem(itemInput)
      .then(() => {
        if (mounted.current) {
          setItemInput('')
          setAlert(true)
        }
      })
  }

  return (
    <>
      <div className="wrapper">
        <h1>My Grocery List</h1>
        <ul>
          {list.map(item => <li key={item.item + "a" + item.id}>{item.item}</li>)}
        </ul>


        {alert && <h2>Submit Successful</h2>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">
            <p>New Item</p>
            <input type="text" id="text" onChange={event => setItemInput(event.target.value)} value={itemInput} />
          </label>
          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  )
}

export default App
