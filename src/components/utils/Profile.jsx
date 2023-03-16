import UserProfileImage from './UserProfileImage'
import UserStatus from './UserStatus'



const Profile = ({ user, hiUserSize, position, ownerOfApp }) => {

  return (
    <div className="direct-message-profile-info d-flex align-items-center fw-bold">
      <UserProfileImage src={user?.profileImage} hiUserSize={hiUserSize} />
      <div className="userName text-break">{user?.name}</div>
      {user?._id === ownerOfApp?._id ? <div className="user-postfix">(You)</div> : null}
      <UserStatus active={user?.active} position={position} />
    </div>
  )
}
export default Profile
