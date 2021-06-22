import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
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
      {console.log(user)}

      <div className="Content"> 
      {user.id > 0 && (             
        <div className="Card-User">
          <img src={user.avatar_url}/>
          <div className="Card-Content">
            <div>
              <h1>{user.name}</h1>
              <p>{user.login}</p>
            </div>
            <table className="Card-table">
              <thead>
                <th>Followers</th>
                <th>Following</th>
                <th>Repositories</th>
              </thead>
              <tbody>
                <td>{user.followers}</td>
                <td>{user.following}</td>
                <td>{user.public_repos}</td>
              </tbody>
            </table>
            <div className="Card-Buttons">        
              <Button href={user.login + "/repos"}>
                Repos
              </Button>
              <Button href={user.login + "/starred"}>
                Starred
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Main;
