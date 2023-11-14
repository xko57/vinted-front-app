import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="picture-input">Choisissez une image</label>
        <input
          //   multiple
          style={{ display: "none" }}
          id="picture-input"
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        {picture && (
          <img
            style={{ height: "100px" }}
            src={URL.createObjectURL(picture)}
            alt="test"
          />
        )}
        <input
          type="text"
          placeholder="Titre"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={description}
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <input
          type="text"
          value={brand}
          placeholder="Marque"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          value={size}
          placeholder="Tailles"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          value={color}
          placeholder="Couleur"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          type="text"
          value={condition}
          placeholder="Etat"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          value={place}
          placeholder="Lieu"
          onChange={(event) => {
            setPlace(event.target.value);
          }}
        />
        <input
          type="number"
          value={price}
          placeholder="Prix"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input type="submit" value="Publier mon offre" />
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
