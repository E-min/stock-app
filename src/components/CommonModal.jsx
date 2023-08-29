import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const FirmsModal = ({ handleClose, openModal, children }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default FirmsModal;
