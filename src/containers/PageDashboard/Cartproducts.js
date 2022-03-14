import React from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { removeitem, getTotal } from "app/cartslice/carteSlice";
import ButtonPrimary from "components/Button/ButtonPrimary";


const Cartproducts = () => {
  let carteitems = [];
carteitems=useSelector((state)=>state.cart.cartItems);
const total = useSelector((state)=>state.cart.total)
console.log(carteitems);
const dispatch=useDispatch();
const base_url = "http://localhost:5050/";
  
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
                            {item.price}$
                          </h2>
                        </div>
                    </td>
                  {  /*<td className="px-6 py-4 whitespace-nowrap">
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
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.qte}
                          </h2>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <a
                        href="/#"
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Edit
                      </a>
                      {` | `}
                      <button
                        
                        className="text-rose-600 hover:text-rose-900"
                        onClick={()=>{ dispatch(removeitem(item.productid))}
                        }
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
      <ButtonPrimary href="/archive/the-demo-archive-slug">Shop More</ButtonPrimary>
      <h3>Total Price : </h3>
      {/* {`${total}$`} */}
      {/* <Pagination /> */}
    </div>
  );
};

export default Cartproducts;