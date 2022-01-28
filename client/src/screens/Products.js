import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  userProducts,
} from "../actions/productAction";
import { storage } from "../firebase";
import "./Products.scss";

function Products({ uname, umail, products, updateProducts, col1, col2 }) {
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [id, setId] = useState("");
  const [product, setProduct] = useState({
    username: uname,
    email: umail,
    name: "",
    desc: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProducts(umail));
  }, []);

  useEffect(() => {
    if (product.image !== "") {
      const target = document.getElementById("photo");
      target.style.backgroundImage = `url("${product.image}")`;
      target.style.backgroundRepeat = "no-repeat";
      target.style.backgroundPosition = "center";
      target.style.backgroundSize = "contain";
    }
  }, [product.image]);

  function show(src, target) {
    var fr = new FileReader();

    fr.onload = function () {
      target.style.backgroundImage = `url("${fr.result}")`;
      target.style.backgroundRepeat = "no-repeat";
      target.style.backgroundPosition = "center";
      target.style.backgroundSize = "contain";
    };
    fr.readAsDataURL(src.files[0]);
  }

  function showImage() {
    var simg = document.getElementById("photo");
    var img = document.getElementById("img");
    show(img, simg);
  }

  const upload = async (e) => {
    showImage();
    setUploading(true);
    const file = await e.target.files[0];
    const date = await Date.now();
    const up = await storage
      .ref(`/ecom/${umail}/${date}${file.name}`)
      .put(file)
      .then((snap) => {
        storage
          .ref(`/ecom/${umail}/${date}${file.name}`)
          .getDownloadURL()
          .then((link) => {
            console.log(link);
            setProduct({ ...product, image: link });
            setUploading(false);
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
      });
  };

  return (
    <>
      <div className="main">
        {create || edit ? (
          <div id="photo" className="create">
            {product.image !== "" && <div className="shade"></div>}
            <img
              className="del"
              src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/document.png`}
            />
            <div>
              <input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={product.desc}
                onChange={(e) =>
                  setProduct({ ...product, desc: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
            <div className="c-img">
              <img
                src={`https://img.icons8.com/fluency-systems-regular/${col2}/48/camera.png`}
                alt="photo"
              />
              <input
                id="img"
                type="file"
                placeholder="Image"
                onChange={(e) => upload(e)}
              />
              {uploading && <span>uploading...</span>}
              {product.image !== "" && <p>uploaded</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
              <button
                onClick={async () => {
                  {
                    create && (await dispatch(createProduct(product)));
                  }
                  {
                    edit && (await dispatch(updateProduct(id, product)));
                  }
                  await updateProducts();
                  await setCreate(false);
                  await setEdit(false);
                }}
              >
                {create ? "Create" : "Update"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {products &&
              products.map((p) => (
                <div key={p?._id} className="prod up">
                  <div className="p-head"></div>
                  <div className="p-cont">
                    <div className="pc-img">
                      <img src={p?.image} alt="" />
                    </div>
                    <p>{p?.name}</p>
                    <span>{p?.price}</span>
                  </div>
                  <div className="pc-imgs">
                    <img
                      onClick={() => {
                        setId(p?._id);
                        product.name = p?.name;
                        product.desc = p?.desc;
                        product.price = p?.price;
                        product.stock = p?.stock;
                        product.category = p?.category;
                        product.image = p?.image;
                        setEdit(true);
                      }}
                      className="edit"
                      src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/edit--v1.png`}
                    />
                    <img
                      onClick={async () => {
                        await dispatch(deleteProduct(p?._id));
                        await dispatch(userProducts(umail));
                      }}
                      className="del"
                      src={`https://img.icons8.com/fluency-systems-regular/${col1}/48/delete.png`}
                    />
                  </div>
                </div>
              ))}
          </>
        )}
        {!edit && (
          <img
            onClick={() => {
              create ? setCreate(false) : setCreate(true);
            }}
            className="createIcon"
            style={create ? { transform: "rotate(45deg)" } : {}}
            src={`https://img.icons8.com/fluency-systems-regular/${col2}/48/plus.png`}
          />
        )}
      </div>
    </>
  );
}

export default Products;
