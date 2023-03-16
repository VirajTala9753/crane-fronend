import { MdOutlineMail } from 'react-icons/md'
import { RiQuestionLine } from 'react-icons/ri'

const Invitation = () => {
  return (
    <div className="invitation px-3 d-flex justify-content-between w-100">
      <div className="d-flex" style={{ textIndent: '5px' }}>
        <MdOutlineMail size={18} /> invited member
      </div>
      <RiQuestionLine size={20} />
    </div>
  )
}
export default Invitation
