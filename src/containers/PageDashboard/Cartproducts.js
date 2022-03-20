import React, { useEffect, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "components/Button/ButtonPrimary";
import {
  additem,
  removeitem,
  updateqte,
  getTotal,
} from "app/cartslice/carteslics";

const calculTot = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price * item.qte;
  });
  return total;
};
const Cartproducts = () => {
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [productToChange, setProductToChange] = useState({
    label: "",
    price: 0,
    productImage: [],
    _id: "",
    qte: 0,
  });
  const dispatch = useDispatch();
  //   useEffect(()=>{
  //  dispatch(getTotal());

  //   },[dispatch])
  const carteitems = useSelector((state) => state.carteslics.cartItems);
  const totale = useSelector((state) => state.carteslics.total);
  //const[qte,setQty]=useState[1];

  const base_url = "http://localhost:5050/";
  const updateQte = (e, item) => {
    setProductToChange({ ...item, qte: e.target.value });
  };
  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {carteitems.map((item) => (
                  <tr key={item.productid}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={`${base_url}${item.productImage}`}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="ml-4 flex-grow">
                        <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                          {item.price}
                        </h2>
                      </div>
                    </td>
                    {/*<td className="px-6 py-4 whitespace-nowrap">
                      {item.liveStatus ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                          Offline
                        </span>
                      )}
                      </td>*/}
                    <td>
                      <div className="ml-4 flex-grow">
                        <input
                          type="number"
                          min={1}
                          defaultValue={1}
                          onChange={(e) => {
                            setDisabledEdit(false);
                            setProductToChange(item);
                            updateQte(e, item);
                          }}
                          className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300"
                        >
                          {/*item.qte*/}
                        </input>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <button
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                        disabled={disabledEdit}
                        onClick={() => {
                          dispatch(additem(productToChange));
                        }}
                      >
                        Edit
                      </button>
                      {` | `}
                      <button
                        className="text-rose-600 hover:text-rose-900"
                        onClick={() => {
                          dispatch(removeitem(item.productid));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="relative h-auto inline-flex items-center justify-center">
        Total {calculTot(carteitems)}
      </div>
      <ButtonPrimary href="/archive/the-demo-archive-slug">
        Shop More
      </ButtonPrimary>
      {/* <Pagination /> */}
    </div>
  );
};

export default Cartproducts;
