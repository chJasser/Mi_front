
import "./payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LayoutPage from "components/LayoutPage/LayoutPage";
import { useEffect, useState } from "react";
import CheckoutForm from "./ChekoutFrom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeitem } from "app/cartslice/carteslics";
import "./style.css"
import axiosInstance from "axiosInstance";

import { useHistory, useLocation } from "react-router-dom";
import { userId } from "app/slices/userSlice";
const stripePromise = loadStripe(
  "pk_test_51KnZ9PJNoRIV4UsgmOtcNzEhyA9I9aeyI3hJ2yjSBfl7Ef8KLpIHWkjgSR1bvrNZWfLqrV87Q4LaldAf6HejO1ms00i5bItXSL"
);

const Payment = ({ className = "" }) => {
  const user = useSelector(userId);
  const cart = useSelector((state) => state.carteslics.cartItems);
  const base_url = "http://localhost:5050/";
  const dispatch = useDispatch();
  const history = useHistory();
  const calculTot = (items) => {
    let total = 0;
    items.map((item) => (total += item.price * item.qte));

    return total;
  };
  const [clientSecret, setClientSecret] = useState("");
  const search = useLocation().search;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5050/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: calculTot(cart) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      });
  }, []);
  const [authToken, setAuthToken] = useState("");
  const token = "a159fbadb9b4d3855360027d42c9246aeefc7523"
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  useEffect(() => {

    const bodyParameters = {

      "vendor": 2253,
      "amount": calculTot(cart) + 5 + calculTot(cart) * 5 / 100,
      "note": "payment"

    };

    axios.post("https://sandbox.paymee.tn/api/v1/payments/create", bodyParameters, config)
      .then(res => {
        if (res.data.status) {
          setAuthToken(res.data.data.token)
          checkPaymePayment(res.data.data.token)

        }
      }).catch(err => console.log(err))
  }, [])


  const checkPaymePayment = () => {

    const token = new URLSearchParams(search).get("payment_token");
    if (token) {
      axios.get(`https://sandbox.paymee.tn/api/v1/payments/${token}/check`, config)
        .then(res => {
          if (res.data.data.payment_status) {
            addPayment(res.data.data);
          }
        })
        .catch(err => console.log(err))
    }
  }
  const addPayment = async (payment) => {
    let cartId = cart.map((item) => item.productid);
    const invoice = {
      customer: user,
      amount: payment.amount,
      paymentId: payment.transaction_id,
      products: cartId,
    };
    const response = await axiosInstance.post("/payment/add", invoice);
    if(response.data.success) {
      history.push(`/mi/invoice/${response.data.paiment.paymentId}`)
    }
    
  };
  const appearance = {
    theme: "flat",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div
      className={`nc-PageSubcription ${className}`}
      data-nc-id="PageSubcription"
    >

      <LayoutPage
        subHeading="Secure payment info."
        headingEmoji="💎"
        heading="Payment"
      >

        <div className="flex">
          <div className="flex-1">
            <form style={{ width: "100%" }} method="post" action="https://sandbox.paymee.tn/gateway/">
              <input type="hidden" name="payment_token" defaultValue={authToken} />
              <input type="hidden" name="url_ok" defaultValue="http://localhost:3000/mi/payment" />
              <input type="hidden" name="url_ko" defaultValue="http://localhost:3000/mi/payment" />

              <button style={{ textAlign: "center" }} className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 w-full mb-5">
                <svg className="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                Pay with Paymee tn
              </button>
            </form>


            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm cart={cart} />
              </Elements>
            )}


          </div>

          <div className="flex-1">
            <div className="">
              <div className="flex h-full flex-col">
                <div className="flex-1 pb-6  px-4 sm:px-6">

                  <div>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.map((item, inedx) => {
                          return (
                            <li key={inedx} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={`${base_url}${item.productImage[0]}`}
                                  alt={item.label}
                                  className="h-full w-full object-cover object-center"
                                />
                                <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <p>{item.label} </p>
                                    </h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">Noir</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p></p>
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        removeitem(item.productid)
                                      );
                                    }}
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 pb-3 px-5 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-500">
                    <p>Subtotal</p>
                    <p>${calculTot(cart)}</p>
                  </div>
                </div>
                <div className="py-2 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-500">
                    <p>Shipping</p>
                    <p>$5</p>
                  </div>
                </div>
                <div className="py-2 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-500">
                    <p>Taxes</p>
                    <p>${calculTot(cart) * 5 / 100}</p>
                  </div>
                </div>
                <div className="border-t border-gray-800 py-6 px-5 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-800">
                    <p>Total</p>
                    <p>${calculTot(cart) + calculTot(cart) * 5 / 100 + 5}</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default Payment;
