import { HiLockClosed, HiOutlineHashtag } from 'react-icons/hi'
import { RiArrowDownSLine } from 'react-icons/ri'
import UserProfileImage from './utils/UserProfileImage'
import UserStatus from './utils/UserStatus'

const HeaderProfile = ({ user, directMessage, isPublic, channelName }) => {
  return (
    <>
      {directMessage ? (
        <div className="position-relative">
          <UserProfileImage src={user.profileImage} hiUserSize={26} />
          <UserStatus active={user.active} position="position-absolute" />
        </div>
      ) : (
        <div className="d-flex align-items-center ">
          {isPublic ? <HiOutlineHashtag size={20} /> : <HiLockClosed size={20} />}
        </div>
      )}

      <div className={`userName text-break ${!directMessage ? 'channel-type' : ''}`}>
        {directMessage ? user.name : channelName}
      </div>
      <RiArrowDownSLine />
    </>
  )
}
export default HeaderProfile
