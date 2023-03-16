import React from 'react'
import { HiPlus } from 'react-icons/hi'
import { IoPlay } from 'react-icons/io5'
import { FiMoreVertical } from 'react-icons/fi'
import { TiPlus } from 'react-icons/ti'
import { useState } from 'react'
import ListItem from './ListItem'
import ProfileStatus from './utils/ProfileStatus'

const DirectMessages = ({ friends, setDirectMessageUser, setOpenChannel }) => {
  const [expanded, setExpanded] = useState(true)

  const handleExpand = () => setExpanded(!expanded)

  return (
    <div className={`dms-container ${expanded ? 'border-none-imp' : ''}`}>
      <div
        className="dms-header h-100 d-flex justify-content-between align-items-center cursor-pointer px-1"
        onClick={handleExpand}
      >
        <div className="d-flex">
          <div className="icon-button">
            <IoPlay className={`rotate-icon ${expanded ? 'rotate' : ''}`} size={10} />
          </div>
          <span className="m-auto">Direct Messages</span>
        </div>
        <div className="d-flex show-icon-button">
          <div className="icon-button" onClick={(e) => e.stopPropagation()}>
            <FiMoreVertical />
          </div>
          <div className="icon-button ml-1" onClick={(e) => e.stopPropagation()}>
            <HiPlus />
          </div>
        </div>
      </div>

      <div className={`dms-list ${expanded ? 'expanded' : ''}`}>
        {/* <div onClick={() => setDirectMessageUser("rashmika.piyush143")}>
          <ListItem
            className="with-border"
            selected
            prefix={
              <ProfileStatus
                active={true}
                src="https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
              />
            }
            content="rashmika.piyush143"
            removable
          />
        </div> */}
        {friends?.map((dmUser, index) => {
          const { active, profileImage, name, selected, _id } = dmUser
          return (
            <div
              onClick={() => {
                setDirectMessageUser(dmUser)
                setOpenChannel(false)
              }}
              key={_id}
            >
              <ListItem
                selected={selected}
                prefix={<ProfileStatus active={active} src={profileImage} />}
                content={name}
                removable
              />
            </div>
          )
        })}
        <ListItem
          className="with-border"
          prefix={
            <div className="list-item-icon">
              <TiPlus size={14} />
            </div>
          }
          content="Add teammates"
        />
      </div>
    </div>
  )
}

export default DirectMessages
