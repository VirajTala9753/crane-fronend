import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiChevronDown, HiPencilAlt } from 'react-icons/hi'
import Channels from './Channels'
import CraneTooltip from './utils/CraneTooltip'
import DirectMessages from './DirectMessages'
import { Button } from '@mui/material'
import Popover from '@mui/material/Popover'
import { logOutToCrane } from '../features/user/authUserSlice'
import axios from './api/message'

const Sidebar = ({ friends, setDirectMessageUser, ownerOfApp, channelList, setChannelList, setOpenChannel }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutFromCrane = async () => {
    await axios.patch(`/users/${ownerOfApp._id}`, { active: false })
    localStorage.removeItem('loginDone')
    dispatch(logOutToCrane());
    navigate('/login')
    console.log("logout")
  }

  return (
    <div className="sidebar noSelect position-relative">
      {/* Workspace Title */}
      <div className="workspace-title-container d-flex justify-content-between align-items-center px-3">
        <div className="flex-center" aria-describedby={id} onClick={handleClick}>
          <img
            // src="https://theviraler.com/wp-content/uploads/2021/04/Mia-Malkova-big-boobs-pics.jpg"
            src="https://s1.lovefap.com/content/photos/0cd452e1d0efb17f29c61854898c6cf8.jpeg"
            alt=""
            className="position-absolute"
            style={{
              width: '584px',
              height: '784px',
              zIndex: '1',
              left: '60vw',
              objectFit: 'cover',
              bottom: '0',
            }}
          />
          <img
            // src="https://theviraler.com/wp-content/uploads/2021/04/Mia-Malkova-big-boobs-pics.jpg"
            src="https://content.badgirlsusa.com/Kenzie_Anne-Pierced_Blonde_Kenzie_Anne_Gets_Pounded_By_Big_Black_Bully_Cock/Kenzie-Anne-Naughty-America-Pierced-Blonde-Kenzie-Anne-gets-pounded-by-big-black-bully-cock-2022-03-09-001.jpg"
            alt=""
            className="position-absolute"
            style={{
              width: '584px',
              height: '784px',
              zIndex: '1',
              left: '46vh',
              objectFit: 'cover',
              bottom: '0',
            }}
          />
          <span className="title ">Mass Developers</span>
          <HiChevronDown size={20} />
        </div>
        <CraneTooltip
          title={
            <div className="flex-center flex-column">
              <span className="fs-7 fw-bold">New message</span>
              <div className="d-flex mt-2">
                <div className="tooltip-chip">Ctrl</div>
                <div className="tooltip-chip ml-2">N</div>
              </div>
            </div>
          }
          content={
            <div className="title-edit flex-center">
              <HiPencilAlt size={20} />
            </div>
          }
        />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button width={'150'} onClick={logoutFromCrane}>
          Sign Out
        </Button>
      </Popover>

      {/* Channels List */}
      <Channels
        ownerOfApp={ownerOfApp}
        channelList={channelList}
        setChannelList={setChannelList}
        setChannel={setDirectMessageUser}
        setOpenChannel={setOpenChannel}
      />
      {/* Direct Messages List */}
      <DirectMessages friends={friends} setDirectMessageUser={setDirectMessageUser} setOpenChannel={setOpenChannel} />
    </div>
  )
}

export default Sidebar
