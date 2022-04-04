import Modal from "react-modal";
import TeacherClassroom from "./TeacherClassroom";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpen } from "app/slices/modalSlice";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function CourseMoadal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.CoursemodalSlice.isOpen);
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => dispatch(setIsOpen(false))}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <button onClick={() => dispatch(setIsOpen(false))}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
}

export default CourseMoadal;
