import React, { useState, useEffect } from "react"
import axios from "axios"
import '../App.css';
import Results from "./Results";
import Nominations from "./Nominations";

Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}


function Search() {
  const [search, updateSearch] = useState("")
  const [results, updateResults] = useState([])
  const [nominations, updateNominations] = useState([])
  const [disabled, updateDisabled] = useState([])
  const [allDisabled, updateAllDisabled] = useState(false)

  useEffect(() => {
    const oldNominations = localStorage.getObj("nominations")
    if (oldNominations) updateNominations(oldNominations)

  }, [])

  function findPreviouslyDisabledMovies(noms, searchResults, disabledArr) {
    for (let i = 0; i < searchResults.length; i++) {
      if (noms.find(cv => cv.id == searchResults[i].imdbID)) {
        disabledArr[i] = true
      }
    }
    return disabledArr
  }


  useEffect(() => {
    if (search.length > 0) searchRequest(search)
  }, [search])

  function handleSearch(e) {
    updateSearch(e.target.value)
  }

  async function searchRequest(search) {
    try {
      const { data } = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=8a5a8cb6&s=${search}&type=movie`)
      if (data.Response === "True") {
        let disabledArr = new Array(data.Search.length).fill(false)
        disabledArr = findPreviouslyDisabledMovies(nominations, data.Search, disabledArr)
        updateResults(data.Search)
        updateDisabled(disabledArr)
      }
    }
    catch (err) {
      console.log({ err })
    }

  }


  return (
    <div>
      <input className="searchbar"
        placeholder="Enter a movie title"
        type="text"
        value={search}
        onChange={handleSearch}
      />
      {allDisabled && <p className="banner">You may only have 5 up to nominations at a time!</p>}
      <div className="resultsNominations">
        <Results
          allDisabled={allDisabled}
          updateAllDisabled={updateAllDisabled}
          disabled={disabled}
          updateDisabled={updateDisabled}
          results={results}
          nominations={nominations}
          updateNominations={updateNominations}
        />
        <Nominations
          results={results}
          nominations={nominations}
          updateNominations={updateNominations}
          disabled={disabled}
          updateDisabled={updateDisabled}
        />
      </div>
    </div>
  )
}

export default Search