import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useGetProductQuery } from "../../redux/apiSlice";
import { Loader } from "../Loader/Loader";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useState } from "react";

export const ProductCard = ({parentToChild}) => {
  let { data, isLoading } = useGetProductQuery();
  const [gridView, setGridView] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(data)
  {
   parentToChild = parentToChild.toLowerCase()
   data = data.filter((product)=>product.title.toLowerCase().includes(parentToChild))
  }

  return (
    <>
    <div className="filter-buttons container d-flex ms-5">
      <div className={`list-view-button ${!gridView ? "active-view" : ""}`} onClick={() =>setGridView(false)}><FaThList/> List view</div>
      <div className={`grid-view-button mx-3  ${gridView ? "active-view" : ""}`} onClick={() =>setGridView(true)}><BsFillGrid3X3GapFill/> Grid view</div>
    </div>
      {isLoading ? (
      <Loader/>
      ) : (
        <>
          <div className="card-container container-animation">
          <div className="container">
            <div className="row">
              {data &&
                data.map((item) => {
                  return (
                    <div key={item.id} className={` mx-auto ${gridView ? "col-md-6 col-lg-4" : "col-12"} `}>
                      <Card
                        className={`m-4 mx-auto shadow-sm border-0 mb-5 p-2 bg-body-tertiary product-card ${gridView ? "" : "flex-row w-100"}`}
                        onClick={() => navigate(`/details/${item.id}`)}
                        variant="primary"
                        style={{ width: "18rem" }}
                      >
                        <Card.Header className={`product-img-container ${gridView ? "" : " grid-sm justify-content-start"}`}>
                          <Card.Img
                            className="product-img"
                            variant="top"
                            src={item.image}
                          />
                        </Card.Header>
                        <Card.Body className={`${gridView ? "" : "d-flex flex-column justify-content-between"} `}>
                          <Card.Title className={`truncate-title ${gridView ? "text-center" : "text-right"}`}>
                            {item.title}
                          </Card.Title>
                          <Card.Text className="truncate-des">
                            {item.description}
                          </Card.Text>
                          <Card.Text>Category : {item.category}</Card.Text>

                          <div className="d-flex justify-content-between ">
                            <Button
                              className=""
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(addToCart({ product: item }));
                              }}
                            >
                              Add to cart
                            </Button>
                            <h4>{item.price} $</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </div>
           </div>
       
       
    </>
    )}
</>
)}
