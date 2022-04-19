import React from "react";
import Modal from "react-modal";

Modal.setAppElement("div");
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

const ModalLayout = ({ isModalOpen, setIsModalOpen, deleteAccount }) => {
	const deleteHandler = () => {
		deleteAccount();
		setIsModalOpen(false);
	};
	const cancelHandler = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			{/* <button onClick={openModal}>Open Modal</button> */}
			<Modal
				isOpen={isModalOpen}
				// onAfterOpen={afterOpenModal}
				// onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Example Modal'
			>
				<h2>Delete account!</h2>
				<div>This is a permanent action.</div>
				<div>Are you sure you want to delete your account?</div>
				<form>
					<button onClick={() => deleteHandler()}>Delete</button>
					<button onClick={() => cancelHandler()}>Cancel</button>
				</form>
			</Modal>
		</div>
	);
};

export default ModalLayout;
