import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getProductDetail = (objectTab) => {
    const details = [];
    for (let index = 0; index < objectTab.length; index++) {
      const element = objectTab[index];
      const keys = Object.keys(element);
      details.push(
        <div key={keys[0]}>
          <span>{keys[0]}</span>
          <span>{element[keys[0]]}</span>
        </div>
      );
    }
    return <>{details}</>;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/offer/${id}`);
        setData(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>Chargement...</span>
  ) : (
    <div className="container product-container">
      <img src={data.product_image.secure_url} alt="" />
      <div className="product">
        <div className="product-detail">
          <span>{data.product_price} €</span>
          {getProductDetail(data.product_details)}
        </div>
        <div className="product-description">
          <h4>{data.product_name}</h4>
          <p>{data.product_description}</p>
          <img
            src={data.owner.avatar ? data.owner.avatar.secure_url : ""}
            alt=""
          />
          <span>{data.owner.username}</span>
        </div>
        <Link
          to="/payment"
          state={{
            title: data.product_name,
            price: data.product_price,
            productId: data._id,
          }}
        >
          <button>Acheter</button>
        </Link>
      </div>
    </div>
  );
};

export default Offer;
