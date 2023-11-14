import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/checkoutForm";

const Payment = ({ token, userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, title, price } = location.state;
  const prixTotal = price * 1.3;
  const stripePromise = loadStripe(
    "pk_test_51OCSQqLiLx0j5jpbcNwpIhTMD7YDBdHIqZrK3oGd6x40iBOa3zuubxRSHNbkEQO7QM5c3FLztsnHI5ZO10GV4sUm00ILdlSWy2"
  );

  useEffect(() => {
    !token && navigate("/login");
  }, []);

  return (
    <div>
      <h5>Résumé de la commande</h5>
      <section className="detail-prix">
        <div>
          <span>Commande</span>
          <span>{price} €</span>
        </div>
        <div>
          <span>Frais de protection des acheteurs</span>
          <span>{price * 0.1}€</span>
        </div>
        <div>
          <span>Frais de port</span>
          <span>{price * 0.2} €</span>
        </div>
      </section>
      <section>
        <div>
          Total<span></span>
          {prixTotal} €
        </div>
        <p>{`Il ne vous reste plus qu'une étape pour vous offrir ${title}. Vous allez payer ${prixTotal} € (frais de protection et frais de port inclus).`}</p>
      </section>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          userId={userId}
          token={token}
          productId={productId}
          price={prixTotal}
          title={title}
        />
      </Elements>
    </div>
  );
};

export default Payment;
