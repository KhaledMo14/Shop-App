import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "./Review.scss";
import {
  removeProduct,
  decrementProduct,
  incremenProduct,
} from "../../redux/cartSlice";
export const Review = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((a, c) => a + c.price * c.quntity, 0);
  return (
    <>
      <div>
        {cart.length > 0 ? (
          <>
            <header>
              <h2 className="text-center my-5">Review Your Product</h2>
            </header>
            <div className="table-responsive col-md-10 mx-auto">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price per item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove Item</th>
                  </tr>
                </thead>
                {cart.map((item, i) => {
                  return (
                    <tbody key={`${item} ${i}`}>
                      <tr className="text-center">
                        <th scope="row">
                          <img
                            className="img-th"
                            alt="product-img"
                            src={item.image}
                          />
                        </th>
                        <td>{item.title}</td>
                        <td>{item.price}$</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button
                              onClick={() => {
                                dispatch(incremenProduct(item.id));
                              }}
                              className="cart btn btn-outline-secondary px-2 py-1 me-2"
                            >
                              <AiOutlinePlus />
                            </button>
                            <span className="pt-1">{item.quntity}</span>
                            <button
                              onClick={() => {
                                dispatch(decrementProduct(item.id));
                              }}
                              className="cart btn btn-outline-secondary px-2 py-1 mx-2"
                            >
                              {" "}
                              <AiOutlineMinus />
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger d-block m-auto"
                            onClick={() => {
                              dispatch(removeProduct(item.id));
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <div className="d-flex justify-content-around align-items-center mt-5">
              <h4> Total Price : {totalPrice}</h4>
              <Link className="btn btn-primary" to="/order">
                Order Now
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div className="text-center">
              <img
                alt="no-data"
                className="d-block m-auto"
                src={require("../../assets/images/empty.webp")}
              />
              <Link className="btn btn-primary" to="/">
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
