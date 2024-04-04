import { hideModal } from "./Redux/features/featSlice";

export const handleClickOutside = (ref, dispatch, modalToHide) => {
  const handler = (e) => {
    if (!ref.current || !ref.current.contains(e.target)) {
      dispatch(hideModal(modalToHide));
    }
  };

  document.addEventListener("mousedown", handler);

  return () => {
    document.removeEventListener("mousedown", handler);
  };
};
