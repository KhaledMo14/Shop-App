import { NavBar } from "../../components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./Order.scss";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Order = () => {
  const notify = () =>
    toast.success("Submitted Successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      email: "",
    },
  });
  const [value, setValue] = useState();
  console.log(errors);
  return (
    <>
      <NavBar />

      <header className="my-5">
        <h1 className="text-center">Order Now</h1>
      </header>

      <div className="col-md-5 mx-auto mt-5 mt-5 p-3 py-4 border rounded-3 container-animation">
        <Form
          onSubmit={handleSubmit((data) => {
            reset();
            setValue("");
            console.log(data);
            if (Object.keys(errors).length === 0) {
              notify();
            }
          })}
        >
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              {...register("address", {
                required: "Adress is Required",
              })}
              type="text"
              placeholder="Enter your Address"
            />
            <Form.Text className="text-danger">
              {errors.address && errors.address?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            {/* <Form.Control type="" placeholder="Enter email" /> */}
            <PhoneInput
              {...register("phone", {
                required: "Phone Number is Required",
              })}
              className="phone-input"
              placeholder="Enter phone number"
              defaultCountry="EG"
              value={value}
              onChange={(value) => setValue(value)}
            />
            <Form.Text className="text-danger">
              {errors.phone && errors.phone?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: " Please Check the Email Format",
                },
              })}
              type="text"
              placeholder="Enter your Email"
            />
            <Form.Text className="text-danger">
              {errors.email && errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" className="w-100 mt-3" type="submit">
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
