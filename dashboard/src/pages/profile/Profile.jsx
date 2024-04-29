import axios from "axios";
import Cookies from "js-cookie";

export default function Profile() {
  const adminToken = Cookies.get("AdminToken");

  if (!adminToken) {
    console.log("No Admin Token found");
  }

  console.log(adminToken)

  return <div>
    h1
  </div>;
}
