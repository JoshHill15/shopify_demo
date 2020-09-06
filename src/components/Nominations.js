import React from "react"
import '../App.css';

function Nominations({ nominations, updateNominations, disabled, updateDisabled, results }) {
  // console.log({ results })

  function findIndex(arr, movie) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].imdbID == movie.id) return i
    }
  }

  function removeNomination(movie) {
    const newNominations = nominations.filter(cv => cv.id != movie.id)
    const newDisabled = [...disabled]
    const index = findIndex(results, movie)
    newDisabled[index] = false
    localStorage.setObj("nominations", newNominations)
    updateDisabled(newDisabled)
    updateNominations(newNominations)

  }

  return (
    <div className="nominations">
      <h2>Nominations: </h2>
      {nominations && nominations.map(({ Title, Year, id }) => (
        <ul>
          <li key={`${id}+${Title}`}>{Title} ({Year}) <button onClick={() => removeNomination({ Title, Year, id })}>Remove</button></li>
        </ul>
      ))}
    </div>
  )
}

export default Nominations