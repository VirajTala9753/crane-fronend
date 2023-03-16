import { Backdrop, Fade, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { CgClose } from 'react-icons/cg'

const ModalBlock = ({ open, handleClose, modalHeader, modalData }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#1A1D21',
    border: '2px solid #000',
    boxShadow: 24,
    color: '#D1D2D3',
    p: 4,
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} className="create-channel-box">
        <Box sx={style}>
          <div className="d-flex justify-content-between m-0 align-items-center">
            {modalHeader}
            <CgClose onClick={handleClose} size={20} className="cursor-pointer p-1" />
          </div>
          {modalData}
        </Box>
      </Fade>
    </Modal>
  )
}
export default ModalBlock
