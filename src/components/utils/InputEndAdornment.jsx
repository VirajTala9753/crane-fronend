import { InputAdornment } from '@mui/material'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'

const InputEndAdornment = ({ isValidate, userName }) => {
  return (
    <InputAdornment position="end">
      {isValidate === true ? <IoCheckmarkCircleOutline size={22} className="true-check-circle" /> : null}
      {isValidate === false ? <IoCloseCircleOutline size={22} className="close-circle-outline" /> : null}
    </InputAdornment>
  )
}
export default InputEndAdornment
