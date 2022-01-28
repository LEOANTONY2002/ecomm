import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default Axios;

//https://leoecom.herokuapp.com
