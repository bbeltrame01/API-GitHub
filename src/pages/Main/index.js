import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style.css';
import './style.css';

function Main() {
  const [user, setUser] = useState([]);

  const handleSearch = (e) => {
    var username = e.target.value;

    if (e.key === 'Enter'){     
      const exec = async() => {
        const response = await fetch('https://api.github.com/users/' + encodeURI(username));
        const json = await response.json();
        setUser(json);
      };
      exec();
    }
  }

  const handleClick = (e) => {
    var username = e.login;

    if (username != ''){
      let path = '/' + encodeURI(username) + '/repos';
      
    }
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="Header">
        <h1>Teste Frontend Compasso</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <input 
            type="text" 
            placeholder="Nome do Usuário..." 
            onKeyDown={(e) => handleSearch(e)}
          />
        </form>
      </div>

      <div className="Content">      
        <div className="Card">
          <div className="Card-Image">
            <img src={user.avatar_url}/>
          </div>
          <div className="Card-Content">
            <h1>{user.name}</h1>
            <div className='Profile-Login'>{user.login}</div>          
            <Button href={user.login + "/repos"} block>
              Repos
            </Button>
            <Button href={user.login + "/starred"} block>
              Starred
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
