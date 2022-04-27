import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenUpResource } from "app/slices/modalSlice";
import AddResource from "./AddResource";
import UpdateResource from "./UpdateResoure";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
  },
};
function UpdateResourceMoadal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state) => state.CoursemodalSlice.isOpenUpResource
  );
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => dispatch(setIsOpenUpResource(false))}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <UpdateResource />
    </Modal>
  );
}

export default UpdateResourceMoadal;
