import { useEffect } from "react";
import { createPortal } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

const Modal = ({ onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => modalRoot.removeChild(el);
  });

  return createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};

describe("Portal", () => {
  it("modal shows the children and a close button", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <div>My Portal</div>
      </Modal>
    );
    expect(screen.getByText(/my portal/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/close/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should be unmounted", () => {
    const { unmount } = render(
      <Modal>
        <div>My Portal</div>
      </Modal>
    );
    expect(screen.getByText(/my portal/i)).toBeInTheDocument();
    unmount();
    expect(screen.queryByText(/my portal/i)).not.toBeInTheDocument();
  });
});
