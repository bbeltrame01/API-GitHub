import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './style.css';

function Main() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [searchType, setSearchType] = useState('user');

  const handleSearch = (e) => {
    var searchValue = e.target.value;

    if (e.key === 'Enter'){     
      const exec = async() => {
        try {
          if (searchType === 'user') {
            //Consultar usuário
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(searchValue)}`);
            const json = await response.json();
            setUser(json);
            setRepos([]); // Limpa os repositórios quando pesquisa usuário
          } else if (searchType === 'repo') {
            // Consultar repositórios
            const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(searchValue)}`);
            const json = await response.json();
            setRepos(json.items || []);
            setUser(null); // Limpa o usuário quando pesquisa repositórios
          }
        } catch(error) {
          console.error(error.message);
        }     
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
        <h1>API-GitHub</h1>
        <div className="searchBox">
          <div className="searchType">
            <label>
              <Form.Check
                inline
                type="radio"
                value="user"
                checked={searchType === 'user'}
                onChange={() => setSearchType('user')}
              />
              Usuário
            </label>
            <label>
              <Form.Check
                inline
                type="radio"
                value="repo"
                checked={searchType === 'repo'}
                onChange={() => setSearchType('repo')}
              />
              Repositório
            </label>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <input 
              type="text"
              placeholder={searchType === 'user' ? 'Nome do Usuário...' : 'Nome do Repositório...'} 
              onKeyDown={(e) => handleSearch(e)}
            />
          </form>
        </div>
      </div>

      <div className="Content">
        {/* Mensagem inicial */}
        {!user && repos.length === 0 && (
          <div className="WelcomeMessage">
            <h2>Bem-vindo ao API-GitHub!</h2>
            <p>Utilize a barra de pesquisa acima para buscar informações de usuários ou repositórios no GitHub.</p>
          </div>
        )}
        
        {/* Exibe informações do usuário */} 
        {user && user.id > 0 && (            
        <div className="Card-User">
          <img src={user.avatar_url} alt={user.login}/>
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

        {/* Exibe lista de repositórios */}
        {repos.length > 0 && (
          <div className="Repo-List">
            <h2>Repositórios Encontrados:</h2>
            <ul>
              {repos.map((repo) => (
                <li key={repo.id} className="Repo-Item">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.full_name}
                  </a>
                  <p>{repo.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
