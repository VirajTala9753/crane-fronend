import { CgClose } from 'react-icons/cg'
import { HiUser, HiOutlineClock } from 'react-icons/hi'
import { MdMoreVert } from 'react-icons/md'
import CraneTooltip from './utils/CraneTooltip'
import UserStatus from './utils/UserStatus'
import getRecentTime from './localTime'

const ProfileSetup = ({
  profileEditor,
  hideProfileEditor,
  workSpaceOwner,
  edit,
  addName,
  setStatus,
  email,
  phone,
  user,
}) => {
  return (
    <div className={`profile-setup ${profileEditor ? 'd-flex' : 'd-none'} flex-column`}>
      <div className="profile-header d-flex justify-content-between align-items-center px-3">
        <h3 className="m-0">Profile</h3>
        <CraneTooltip
          title={
            <div className="flex-center">
              <span className="fs-7 fw-bold">Close</span>
            </div>
          }
          content={
            <div className="flex-center cursor-pointer">
              <CgClose size={18} className="profile-show-hide p-1" onClick={hideProfileEditor} />
            </div>
          }
        />
      </div>
      <div className="profile-workSpace">
        <div className="profile-image flex-center flex-column  m-auto position-relative ">
          {user.profileImage ? <img src={user.profileImage} alt="" /> : <HiUser size={'32vh'} />}
          {workSpaceOwner}
        </div>
        <div className="profile-edit d-flex flex-column px-3 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="m-0 fs-5 fw-bold">{user.name}</div>
            <div className="edit fw-bold">{edit}</div>
          </div>
          {addName}
        </div>
        <div className="show-status px-3 pY-1">
          <div className="d-flex align-items-center">
            <UserStatus active={user.active} />
            <div className="ml-2">{user.active ? 'Active' : 'Away'}</div>
          </div>

          <div className="local-time d-flex flex-column py-2 ">
            <div className="d-flex align-items-center fs-6-7 fw-normal">
              <HiOutlineClock className="pr-1" /> {getRecentTime()}
              <div className="pl-1">Local time</div>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="status-update-setting  flex-center set-status cursor-pointer fs-6-7 ">{setStatus}</div>
            <MdMoreVert className="status-update-setting set-more" />
          </div>
        </div>
      </div>
      <div className="contact-info p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="m-0 fs-6 fw-bold">Contact Information</div>
          <div className="edit fw-bold">{edit}</div>
        </div>
        {email}
        {phone}
      </div>
    </div>
  )
}

export default ProfileSetup
