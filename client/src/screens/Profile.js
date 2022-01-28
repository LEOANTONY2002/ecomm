import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../actions/userAction";
import { storage } from "../firebase";
import "./Profile.scss";

function Profile({ col1, col2, us }) {
  const [user, setUser] = useState(us);
  const [prof, setProf] = useState(true);
  const [edit, setEdit] = useState(false);
  const [name, setname] = useState(user?.name);
  const [img, setImg] = useState(user?.image);
  const [shw, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    if (Cookies.get("ecom_user"))
      await setUser(JSON.parse(Cookies.get("ecom_user")) || []);
  }, edit);

  useEffect(() => {
    if (edit || shw) {
      if (img !== "") {
        var target = document.getElementById("photo");
        if (target !== null) {
          target.style.backgroundImage = `url("${img}")`;
          target.style.backgroundRepeat = "no-repeat";
          target.style.backgroundPosition = "center";
          target.style.backgroundSize = "cover";
        }
      }
    } else {
      var target = document.getElementById("photo");
      if (target !== null) target.style.backgroundImage = "";
    }
  }, [img, edit, shw]);

  const upload = async (e) => {
    const file = await e.target.files[0];
    const up = await storage
      .ref(`/ecom/profile/${user.email}/${file.name}`)
      .put(file)
      .then((snap) => {
        storage
          .ref(`/ecom/profile/${user.email}/${file.name}`)
          .getDownloadURL()
          .then((link) => {
            console.log(link);
            setImg(link);
            setShow(true);
          })
          .catch((err) => {
            console.log(err);
            setShow(false);
          });
      });
  };

  console.log(user);

  return (
    <div className="main">
      {prof ? (
        <div id="photo" className="profile">
          {edit && <div className="shade"></div>}
          <div className="p-img">
            {edit ? (
              <>
                <img
                  className="pi-edit"
                  src={`https://img.icons8.com/fluency-systems-regular/${col2}/48/camera.png`}
                />
                <input id="img" type="file" onChange={(e) => upload(e)} />
              </>
            ) : (
              <img
                className="pi-user"
                style={
                  user?.image && { padding: 0, width: "120px", height: "120px" }
                }
                src={
                  user?.image
                    ? user.image
                    : `https://img.icons8.com/fluency-systems-regular/${col1}/96/user.png`
                }
              />
            )}
          </div>
          {edit ? (
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          ) : (
            <p>{user?.name}</p>
          )}
          <span>{user?.email}</span>
          {!edit && (
            <div className="logout">
              <span>logout</span>
              <img
                onClick={() => {
                  Cookies.set("ecom_user", []);
                  navigate("/");
                }}
                src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/exit.png`}
              />
            </div>
          )}
          {edit && (
            <button
              onClick={async () => {
                await dispatch(
                  updateUser({
                    name,
                    email: user?.email,
                    password: "leo",
                    image: img,
                  })
                );
                await setShow(false);
                setEdit(false);
                navigate("/login");
              }}
            >
              Update
            </button>
          )}
          <img
            onClick={() => (edit ? setEdit(false) : setEdit(true))}
            className="p-edit"
            src={
              edit
                ? `https://img.icons8.com/fluency-systems-regular/${col1}/48/cancel.png`
                : `https://img.icons8.com/fluency-systems-regular/${col1}/48/edit.png`
            }
          />
        </div>
      ) : (
        <div className="profile prods">
          <div className="p-field">
            <img
              style={{ marginLeft: "25px" }}
              onClick={() => navigate("/products")}
              src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/store-setting.png`}
            />
            <span>products</span>
          </div>
          <div className="p-field">
            <span>orders</span>
            <img
              style={{ marginRight: "45px" }}
              onClick={() => navigate("/orders")}
              src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/purchase-order.png`}
            />
          </div>
        </div>
      )}

      <div className="m-nav">
        <img
          style={
            prof
              ? {
                  background:
                    "linear-gradient(120deg, var(--col1), var(--col2))",
                }
              : {}
          }
          onClick={() => setProf(true)}
          src={
            prof
              ? `https://img.icons8.com/fluency-systems-regular/${col2}/48/user.png`
              : `https://img.icons8.com/fluency-systems-regular/${col1}/48/user.png`
          }
        />
        <img
          style={
            !prof
              ? {
                  background:
                    "linear-gradient(120deg, var(--col1), var(--col2))",
                }
              : {}
          }
          onClick={() => setProf(false)}
          src={
            !prof
              ? `https://img.icons8.com/fluency-systems-regular/${col2}/48/store-setting.png`
              : `https://img.icons8.com/fluency-systems-regular/${col1}/48/store-setting.png`
          }
        />
      </div>
    </div>
  );
}

export default Profile;
