import React, { useEffect, useState } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { searchApi, updateApi } from './api/SearchApi'
import { Button, TextField } from '@mui/material'

let searchTimeout = null

const SearchApi = (_id , open) => {
  const [dropDownEmail, setDropDownEmail] = useState([])
  const [selectEmail, setSelectEmail] = useState()
  const [selectUserName, setSelectUserName] = useState()
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
      open(true)
    } catch (error) {
      console.log(error)
    }
    setDropDownEmail([])
    setSelectEmail()
    setSelectUserName()
  }

  return (
    <div>
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
    </div>
  )
}

export default SearchApi
