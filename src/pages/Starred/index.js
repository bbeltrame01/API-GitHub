import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useRouteMatch } from "react-router-dom";
import '../style.css';
import './style.css';

function Starred() {
  const [starred, setStarred] = useState([]);
  const { params } = useRouteMatch();
  let history = useHistory();

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/' + encodeURI(params.user) + '/starred' );
    const json = await response.json();
    setStarred(json);
  }, [params.user]);

  return(
    <>
      <div className="Header">
        <Button onClick={() => history.goBack()}>
          Voltar
        </Button>
        <h1>Mais Visitados</h1>
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
                starred.map(rep => {
                  return (                  
                    <tr>
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

export default Starred;