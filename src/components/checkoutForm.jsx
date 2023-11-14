import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ userId, token, productId, price, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  // Va nous permettre de faire une requête à Stripe pour lui envoyer les codes
  const stripe = useStripe();

  //   Pour récupérer le contenu de CardElement
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Je récupère le contenu de l'input
      const cardElement = elements.getElement(CardElement);

      //   J'envoie ces informations à stripe pour qu'il valide l'existence de la carte
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId, // J'envoie un identifiant de ce lui qui paye pour savoir qui est à l'origine de la transaction
      });

      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      //   Je fais une requête à mon back et je lui envoie mon stripeToken

      const response = await axios.post("http://localhost:3000/payment", {
        stripeToken: stripeToken,
        userId: userId,
        productId: productId,
        title: title,
        token: token,
        price: price,
      });

      //   Si la réponse contient succeeded, je fais apparaitre "payment validé"
      if (response.data.status === "succeeded") {
        setSucceeded(true);
      } else {
        setIsLoading(false);
      }

      //console.log(stripeToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      {succeeded ? (
        <p>Paiement validé</p>
      ) : (
        <input type="submit" value="Acheter" disabled={isLoading} />
      )}
    </form>
  );
};

export default CheckoutForm;
