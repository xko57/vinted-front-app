import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      });
      setErrorMessage("");
      handleToken({ token: response.data.token, userId: response.data._id });
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" />
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </main>
  );
};

export default Login;
