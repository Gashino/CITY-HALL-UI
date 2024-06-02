import React from "react";
import CreateCardBase from "./CardCreationBase";
import { useAuth } from "../context/auth";

const CreationReclamoCard = () => {
  const { user } = useAuth();
  return <CreateCardBase title={"Creación de denuncia"}></CreateCardBase>;
};

export default CreationReclamoCard;
