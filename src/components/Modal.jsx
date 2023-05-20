import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, children, actionBar, currentUser }) {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");
		document.querySelector(".main").classList.add("blur-sm");
		return () => {
			document.body.classList.remove("overflow-hidden");
			document.querySelector(".main").classList.remove("blur-sm");
		};
	}, []);

	return ReactDOM.createPortal(
		<div>
			<div
				onClick={onClose}
				className="fixed inset-0 bg-gray-200 p-3 blur-sm opacity-50"></div>
			<div className="fixed inset-40 rounded-xl overflow-auto p-10 bg-white modal">
				<h1 className="text-3xl">{`${currentUser}'s posts`}</h1>
				<div className="flex child flex-col p-3 justify-between h-full">
					{children}
					<div className="flex justify-end sticky bottom-0">{actionBar}</div>
				</div>
			</div>
		</div>,
		document.querySelector(".modal-container")
	);
}

export default Modal;
