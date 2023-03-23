import * as React from 'react'
import { useState, useEffect } from 'react'
import { HiLockClosed, HiOutlineHashtag } from 'react-icons/hi'
import { RiUserAddLine } from 'react-icons/ri'
import ModalBlock from './utils/ModalBlock'
import { Button, TextField } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { IoLockClosedOutline } from 'react-icons/io5'
import moment from 'moment'
import { searchApi, updateApi } from './api/SearchApi'

let searchTimeout = null

const ChannelProfile = ({ name, isPublic, createdAt, description, _id }) => {
  const [open, setOpen] = useState(false)
  const [dropDownEmail, setDropDownEmail] = useState([])
  const [selectEmail, setSelectEmail] = useState()
  const [selectUserName, setSelectUserName] = useState()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout)
    }
  }, [])

  const handleSearch = async (value) => {
    try {
      const res = await searchApi.searchemail({
        channelId: _id,
        email: value,
      })
      if (!res.filterdUser.length) return
      setDropDownEmail(res.filterdUser)
    } catch (error) {
      console.log(error)
      setDropDownEmail([])
    }
  }

  const searchEmail = (value) => {
    console.log(value)
    if (!value) {
      setDropDownEmail([])
      return
    }
    console.log('hftgyjut')
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => handleSearch(value), 500)
  }
  const handelSubmit = async (e) => {
    e.preventDefault()
    if (!selectEmail) return

    try {
      const data = await updateApi.updateId({
        selectedUserId: selectEmail,

        channelId: _id,
        selectedUserName: selectUserName,
      })
      console.log(data, 'data')
      handleClose()
    } catch (error) {
      console.log(error)
    }
    setDropDownEmail([])
    setSelectEmail()
    setSelectUserName()
  }

  return (
    <div className="channel-profile-container d-flex ">
      <div className="channel-logo border flex-center fw-bold">
        {isPublic ? <HiOutlineHashtag size={22} /> : <IoLockClosedOutline size={22} />}
      </div>
      <div className="channel-description d-flex flex-column">
        <div className="channel-info d-flex align-items-center fw-bold fs-">
          {name === 'general' ? 'You are looking at the' : 'This is the very beginning of the'}
          <div className="d-flex align-items-center channel-type-name px-1">
            {isPublic ? <HiOutlineHashtag className="mr-1" /> : <HiLockClosed className="mr-1" />}
            {name}
          </div>{' '}
          channel
        </div>

        {name === 'general' ? (
          <span className="message-format text-break">
            This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide
            conversations.
          </span>
        ) : (
          <span className="message-format text-break">
            You created this channel on {moment(createdAt).format('MMMM Do')}.<span className="pl-1">{description}</span>
          </span>
        )}

        <Button className="d-flex align-items-center add-people " onClick={handleOpen}>
          <RiUserAddLine className="mr-2" size={22} /> Add people
        </Button>
        <ModalBlock
          open={open}
          handleClose={handleClose}
          modalHeader={
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bold">add people</span>
              <div className="d-flex align-items-center">
                {isPublic ? <HiOutlineHashtag className="mr-1" /> : <HiLockClosed className="mr-1" />} {name}
              </div>{' '}
            </div>
          }
          modalData={
            <div className="mt-4 d-flex flex-column add-people-container">
              <Autocomplete
                disablePortal
                id="outlined-basic-description"
                className="mt-3"
                name="description"
                freeSolo
                onInputChange={(e, value) => {
                  searchEmail(value)
                }}
                onChange={(e, value) => {
                  console.log(value.name, 'valuuee')
                  setSelectUserName(value.name)
                  console.log(value._id, 'onchange')
                  setSelectEmail(value._id)

                  console.log(selectUserName, 'naaaaame')
                }}
                options={dropDownEmail}
                getOptionLabel={(option) => (option ? option.email : null)}
                sx={{ width: 500 }}
                fullWidth
                style={{ fontSize: '20px !important' }}
                renderInput={(params) => <TextField {...params} label="search email" />}
              />
              <Button className="add-people-save-btn" onClick={handelSubmit}>
                save
              </Button>
            </div>
          }
        />
      </div>
    </div>
  )
}
export default ChannelProfile
