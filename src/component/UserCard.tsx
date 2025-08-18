import React from "react";
import "@/app/styles/userCard.css"

type CardsProps = {
  name: string;
  email: string;
  imageUrl: string;
};

const UserCard = ({ name, email, imageUrl }: CardsProps) => {
  return (
    <div>
      <div className="card">
        <img src={imageUrl} alt={name} className="image" />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
