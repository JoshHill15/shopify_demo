import React, { useEffect } from "react"
import '../App.css';

const MAX_NOMINATIONS = 5



function Results({ results, nominations, updateNominations, disabled, updateDisabled, allDisabled, updateAllDisabled }) {

  const mappedResults = results.map(({ Title, Year, imdbID }) => {
    return { Title, Year, id: imdbID }
  })

  function nominate(newMovie, index) {
    const newNominations = [...nominations, newMovie]
    const newDisabled = [...disabled]
    newDisabled[index] = true
    localStorage.setObj("nominations", newNominations)
    updateDisabled(newDisabled)
    updateNominations(newNominations)
  }

  useEffect(() => {
    if (nominations && nominations.length >= MAX_NOMINATIONS) updateAllDisabled(true)
    else updateAllDisabled(false)
  }, [nominations])


  return (
    <div className="results">
      <h2>Results: </h2>
      {mappedResults && mappedResults.map(({ Title, Year, id }, i) => (
        <ul>
          <li
            key={id}>{Title} ({Year})
              <button
              onClick={e => {
                nominate({ id, Title, Year }, i)
              }}
              disabled={allDisabled || disabled[i]}
            >
              Nominate
             </button >
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Results