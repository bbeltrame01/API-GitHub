import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useRouteMatch } from "react-router-dom";
import { format } from 'date-fns';
import '../style.css';

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

  const goHome = () =>{ 
    let path = '/';
    history.push(path);
  }

  return(
    <>
      <div className="Header">
        <div class="Buttons">
          <Button type="button" class="btn" variant="primary" onClick={goHome}>Início</Button>
          <Button type="button" class="btn" variant="secondary" onClick={() => history.goBack()}>Voltar</Button>
        </div>
        <h1>Mais Visitados</h1>
      </div>

      <div className="Content">
        {/* Exibe lista de repositórios */}
        <div className="Repo-List">
          <ul>
            {starred.map((repo) => (
              <li key={repo.id} className="Repo-Item">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.full_name}
                </a>
                <p>{repo.description}</p>
                <p>{format(new Date(repo.created_at),"dd/MM/yyyy', às ' HH:mm'h'")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Starred;