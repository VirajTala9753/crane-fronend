import { HiOutlineClock } from 'react-icons/hi'
import getRecentTime from '../localTime'

const LocalTime = () => {
  return (
    <div className="d-flex align-items-center fs-6-7 fw-normal">
      <HiOutlineClock className="pr-1" /> {getRecentTime()} Local time
    </div>
  )
}

export default LocalTime
