import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(event.target);
      setErrorMessage("");
      const response = await axios.post("http://localhost:3000/user/signup", {
        email,
        username,
        password,
        newsletter,
      });
      handleToken({ token: response.data.token, userId: response.data._id });
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all fields");
      } else if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one :)"
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="signu-cotainer">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="email"
            placeholder="eMail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="checkbox"
            value={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
          <span>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </span>
          <button type="submit">S'incrire</button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </div>
  );
};

export default Signup;
