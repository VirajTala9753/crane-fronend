import { HiUser } from 'react-icons/hi'

const UserProfileImage = ({ src, hiUserSize }) => {
  return src ? (
    <img className="user-dp flex-center object-fit-cover" alt="" src={src}></img>
  ) : (
    <div className="user-dp  flex-center" alt="">
      <HiUser size={hiUserSize} className="hi-user-icon" />
    </div>
  )
}

export default UserProfileImage
