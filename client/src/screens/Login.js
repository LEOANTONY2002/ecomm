import React, { useState } from "react";
import "./Login.scss";
import userIcon from "./icons/user.png";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

function Login({ col1, col2 }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [log, setLog] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(user);

  const sign = async () => {
    if (log) {
      setLoading(true);
      console.log("logging in...");
      await dispatch(login(email, password));
      if (user) {
        setLoading(false);
        navigate("/");
      }
    } else {
      await dispatch(signup(name, email, password));
      if (user) {
        setLoading(false);
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="main">
        <div className="form">
          <img
            src={`https://img.icons8.com/fluency-systems-regular/96/${col1}/user.png`}
          />
          {!log && (
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={sign}>{log ? "Login" : "Signup"}</button>
          <div className="or">
            <span></span>
            <p>or</p>
            <span></span>
          </div>
          <p onClick={() => (log ? setLog(false) : setLog(true))}>
            {log ? "Signup" : "Login"}
          </p>
          <span className="err">
            {user == "p"
              ? "incorrect password"
              : user == "u"
              ? "user email doesn't exist"
              : ""}
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
