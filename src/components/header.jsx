import { Link } from "react-router-dom";

const Header = ({ handleToken, token }) => {
  return (
    <header>
      <nav>
        <div className="logoVinted">
          <Link to="/">
            <img
              src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
              alt="Logo vinted de couleur turquoise pale"
            />
          </Link>
        </div>
        <div className="filters">
          <input type="text" />
        </div>
        {token ? (
          <div>
            <Link to="/">
              <button
                onClick={() => {
                  handleToken({ token: null });
                }}
              >
                Se déconecter
              </button>
            </Link>
            <Link to={token ? "/publish" : "/login"}>
              <button>Vends tes articles</button>
            </Link>
          </div>
        ) : (
          <div className="actions">
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
            <Link to={token ? "/publish" : "/login"}>
              <button>Vends tes articles</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
