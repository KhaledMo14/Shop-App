import { NavBar } from "../../components/NavBar/NavBar";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import "./Details.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useGetDetailsQuery } from "../../redux/apiSlice";
import { Loader } from "../../components/Loader/Loader";

export const Details = () => {
  const param = useParams();
  const { data, isLoading } = useGetDetailsQuery(param.id);
  const dispatch = useDispatch();
  const[quntityNumber,setQuntityNumber] = useState(1)
  return (
    <>
      <NavBar />

      {isLoading?
      <Loader/> 
      :
      <div className=" col-md-8 mx-auto container-animation ">
      <div className="details row my-5 p-2 mx-auto shadow rounded">
        <div className="details-img col-md-6 d-flex justify-content-center align-items-center">
          <img
            className=" rounded-start w-50 h-md-50"
            src={data?.image}
            alt=""
          />
        </div>
      <div className="product-data col-md-6 p-5 d-flex flex-column justify-content-between">
        <div>
          <h2>{data?.title}</h2>
          <p className="text-muted">{data?.description}</p>
          <p>{data?.category}</p>
          <p>{data?.price} $ </p>
          <div className="mt-4">
            <button
              onClick={() => {
                setQuntityNumber(quntityNumber+1)
              }}
              className="cart btn btn-secondary px-2 py-1 me-2"
            >
              <AiOutlinePlus />
            </button>
            {quntityNumber}
            <button
              onClick={() => {
                if(quntityNumber>1) {
                  setQuntityNumber(quntityNumber-1) 
                }
              }}
              className="cart btn btn-secondary px-2 py-1 mx-2"
            >
              {" "}
              <AiOutlineMinus />
            </button>
          </div>
        </div>
        <div className="w-100">
          <button
            onClick={() => {
              dispatch(addToCart({product:data , quntity:quntityNumber}));
            }}
            className="cart btn btn-lg btn-primary px-3 py-2 my-4 w-100"
          >
            Add to cart
          </button>
        </div>
      </div>
      </div>
    </div>
      }


    </>
  );
};
