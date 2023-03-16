import React from 'react'
import UserProfileImage from './UserProfileImage'
import UserStatus from './UserStatus'

const ProfileStatus = ({ src, active, addButton, plusSign }) => {
  return !addButton ? (
    <div className="profile-status  flex-center">
      <div className="position-relative dp-status">
        <UserProfileImage src={src} hiUserSize={20} />
        <UserStatus active={active} position="position-absolute" />
      </div>
    </div>
  ) : (
    <div className="profile-status position-relative flex-center">
      <div className="user-dp flex-center">{plusSign}</div>
    </div>
  )
}

export default ProfileStatus
