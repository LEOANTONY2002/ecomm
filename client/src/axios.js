import axios from "axios";

const Axios = axios.create({
  baseURL: "https://leoantony2002-humble-fortnight-wxwg94765gvc94p-5001.preview.app.github.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default Axios;

//https://thawing-hollows-53935.herokuapp.com

//https://leoecom.herokuapp.com

//https://leoantony2002-humble-fortnight-wxwg94765gvc94p-8080.preview.app.github.dev/
