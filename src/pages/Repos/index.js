import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import '../style.css';
import './style.css';

function Repos() {
  const [repos, setRepos] = useState([]);
  const { params } = useRouteMatch();
  let history = useHistory();
  
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/' + encodeURI(params.user) + '/repos' );
    const json = await response.json();
    setRepos(json);
  }, [params.user]);

  const routeChange = () =>{ 
    let path = '/'; 
    history.push(path);
  }

  return(
    <>
      <div className="Header">
        <Button onClick={routeChange}>Voltar</Button>
        <h1>Repositórios</h1>
      </div>
      <div className="Content">
        
        <div className="Card">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data Criação</th>
              </tr>
            </thead>
            <tbody>
              {
                repos.map(rep => {
                  return (                  
                    <tr key={rep.id}>
                      <td>{rep.name}</td>
                      <td>{rep.description}</td>
                      <td>{rep.created_at}</td>
                    </tr>
                  );
                })
              }            
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Repos;