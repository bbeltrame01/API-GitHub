import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useRouteMatch } from "react-router-dom";
import { format } from 'date-fns';
import '../style.css';
import './style.css';

function Starred() {
  const [starred, setStarred] = useState([]);
  const { params } = useRouteMatch();
  let history = useHistory();

  useEffect(() => {
    const exec = async() => {
      const response = await fetch('https://api.github.com/users/' + encodeURI(params.user) + '/starred' );
      const json = await response.json();
      setStarred(json);
    };
    exec();
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
                      <td>{format(new Date(rep.created_at),"dd/MM/yyyy', às ' HH:mm'h'")}</td>
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