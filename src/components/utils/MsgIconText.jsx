import { TbMessageCircle2 } from 'react-icons/tb'

const MsgIconText = () => {
  return (
    <div className="d-flex align-items-center p-2">
      <TbMessageCircle2 size={18} style={{ transform: 'rotateY(3.142rad)' }} className="pl-2" />
      Message
    </div>
  )
}

export default MsgIconText
