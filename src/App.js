import './App.css';
import React, { useState, useEffect } from 'react';
import NavbarComponent from './components/navbar.component';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const getAllCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`);
        const data = response.data;

        setCharacters(data.results);
      } catch (error) {
        console.info(error.message);
      }
    };

    getAllCharacter();
  }, [query]);

  return (
    <>
      <NavbarComponent />
      <div className="App mt-3">
        <div class="container">
          {/* Search Character */}
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search Character" onChange={ (e) => setQuery(e.target.value) } value={ query } />
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
          </div>

          {/* Get All Data Character */}
          <div className="row align-items-start">
            {
              characters.map((character, index) => {
                return (
                  <div className="col-lg-4 col-md-4 col-sm-6 my-2" key={ index }>
                    <div className="card">
                      <img src={ character.image } className="card-img-top" alt="profile-character" />
                      <div className="card-body">
                        <h5 className="card-title">
                          { character.name }
                        </h5>
                        <p className="card-text text-muted">
                          Species: { character.species }
                        </p>
                        <p className="card-text text-muted">
                          Status: { character.status }
                        </p>
                        <p className="card-text text-muted">
                          Gender: { character.gender }
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
