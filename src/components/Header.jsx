import React, { useState } from 'react'
import ListItem from './ListItem'
import ProfileStatus from './utils/ProfileStatus'
import { TiPlus } from 'react-icons/ti'
import CraneTooltip from './utils/CraneTooltip'
import ModalBlock from './utils/ModalBlock'

import { HiUser } from 'react-icons/hi'
import UserProfileImage from './utils/UserProfileImage'
import UserStatus from './utils/UserStatus'

const Header = ({ headerProfile, channel }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [showDiv, setShowDiv] = useState(false);
  const [activeTag, setActiveTag] = useState("about");


  return (
    <div className="header w-100 d-flex flex-column ">
      <div className="profile-details d-flex  align-items-center">
        <div className="header-profile d-flex  align-items-center" onClick={handleOpen}>
          {headerProfile}
        </div>
       
       { channel &&
        <ModalBlock
          open={open}
          handleClose={handleClose}
          modalHeader={<div className='d-flex'>{headerProfile}</div>}
          modalData={
            <div>
               <div className='d-flex justify-content-center py-3'>
              <div className = {`${activeTag === "members" ? 'part' : '' } px-2` }   onClick={() => {  
              setActiveTag("members")
             }
              }>
             members
              </div>
             
              <div  className ={`${activeTag === "about" ? 'part' : '' } px-2`  }  onClick={() => { 
              setActiveTag("about")} }>About </div></div>
              <div>
              
              {
               activeTag === "members" &&  channel?.participants.map((user) => 
                <div>{user.userName}</div>
              )}
              </div>
            
            </div>
          }
        />}
      </div>
      <div className="add-bookmark d-flex align-items-center">
        <CraneTooltip
          title={
            <div>
              <span className="fs-7 fw-bold">Add a bookmark</span>
            </div>
          }
          content={
            <div className="title-edit">
              <ListItem
                prefix={<ProfileStatus active addButton={true} plusSign={<TiPlus size={14} />} />}
                content="Add a bookmark"
              />
            </div>
          }
        />
      </div>
    </div>
  )
}

export default Header
