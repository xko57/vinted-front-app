import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getValueFromKeyName = (objectTab, keyName) => {
    for (let index = 0; index < objectTab.length; index++) {
      const element = objectTab[index];

      const keys = Object.keys(element);
      if (keys[0] === keyName) {
        return element[keyName];
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/offers");

        setData(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <h1>Home Page</h1>
  ) : (
    <>
      <div className="hero">
        <div className="hero-announce">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Link to={token ? "/publish" : "/login"}>
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="offers-container">
          {data.map((offer) => (
            <Link className="offer" to={`/offer/${offer._id}`} key={offer._id}>
              <span>
                <img
                  className="avatarPicture"
                  src={offer.avatar ? offer.avatar.secure_url : ""}
                  alt=""
                />
                <span>{offer.owner.username}</span>
              </span>

              <img
                className="productPicture"
                src={offer.product_image.secure_url}
                alt=""
              />
              <h4>{offer.product_price} €</h4>

              <h4>{getValueFromKeyName(offer.product_details, "TAILLE")}</h4>
              <h4>{getValueFromKeyName(offer.product_details, "MARQUE")}</h4>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
