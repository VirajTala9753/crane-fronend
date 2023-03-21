import React, { useState } from 'react'
import ListItem from './ListItem'
import ProfileStatus from './utils/ProfileStatus'
import { TiPlus } from 'react-icons/ti'
import CraneTooltip from './utils/CraneTooltip'
import ModalBlock from './utils/ModalBlock'


const Header = ({ headerProfile }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className="header w-100 d-flex flex-column ">
      <div className="profile-details d-flex  align-items-center">
        <div className="header-profile d-flex  align-items-center"    onClick={handleOpen}>{headerProfile}</div>
<ModalBlock 
open ={open}
handleClose={handleClose}
modalHeader = {
<div>{headerProfile}</div>
}

/>
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
