import React from "react";

import Login from "../components/login";
import AddVehicle from "@/app/components/add-vehicle";

const ActionVehicle = ({ params }) => {
  const { action } = params;
  switch (action) {
    case "login":
      return <Login />;
  }
};

export default ActionVehicle;
