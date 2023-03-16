import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { HiPlus } from 'react-icons/hi'
import { MdOutlineMail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
// import Invitation from "../components/utils/Invitation";
import MessageSender from '../components/MessageSender'
import ProfileSetup from '../components/ProfileSetup'
import ContactItem from '../components/utils/ContactItem'
import { authUserData } from '../features/user/authUserSlice'

import DirectMessageProfile from '../components/utils/DirectMessageProfile'
import HeaderProfile from '../components/HeaderProfile'
import ChannelProfile from '../components/ChannelProfile'
import { getDifferedState } from '../components/api/utils'
import { Link } from '@mui/material'
import { io } from 'socket.io-client'
import axios from '../components/api/message'

const socket = io('https://sparkling-crow-clothes.cyclic.app', { transports: ['websocket'], withCredentials: true })
const MainLayout = ({ Component, ...rest }) => {
  const ownerOfApp = useSelector(authUserData)

  const [chatMessage, setChatMessage] = useState({})
  const [profileEditor, setProfileEditor] = useState(false)
  const [channelList, setChannelList] = useState({})
  const [openChannel, setOpenChannel] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [friends, setFriends] = useState([])
  const [directMessageUser, setDirectMessageUser] = useState({})
  const showProfileEditor = () => {
    setProfileEditor(true)
  }
  const HideProfileEditor = () => {
    setProfileEditor(false)
  }

  useEffect(() => {
    socket.on('message', async (data) => {
      const currentChats = { ...await getDifferedState(setChatMessage) }
      const directMessageUser = { ...await getDifferedState(setDirectMessageUser) }
      console.log('Message received', data, directMessageUser)
      if (data.isChannelMessage && data.message.channelId !== directMessageUser._id) {
        console.log('Returning because channel not matched.')
        return
      }
      if (!data.isChannelMessage && data.message.senderId !== ownerOfApp._id && data.message.receiverId !== ownerOfApp._id) {
        console.log('Returning because users not matched.', data.message.senderId, data.message.receiverId, ownerOfApp._id)
        return
      }
      switch (data.action) {
        case 'create':
          currentChats[data.localId] = { ...data.message, localKey: data.localId }
          break
        case 'update':
          currentChats[data.localId] = { ...data.message, localKey: data.localId }
          break
        case 'delete':
          delete currentChats[data.localId]
          break
        default:
          break
      }
      // console.log('Setting current chats to', currentChats)
      setChatMessage(currentChats)
    })

    return () => socket.off('message')
  }, [])

  // useEffect(() => {
  //   console.log('Chat message updated', chatMessage)
  // }, [chatMessage])

  const getFriendsData = async () => {
    setDataLoading(true)
    const response = await axios.get('/users')

    const data = response.data.users
    const filterUSer = data?.filter(({ _id }) => _id !== ownerOfApp._id)

    setFriends([{ ...ownerOfApp }, ...filterUSer])
    setDataLoading(false)
  }

  useEffect(() => {
    getFriendsData()
  }, [])

  const messageSenderPage = (user) => {
    return friends?.map((friend) => {
      if (user.name === friend.name) {
        return (
          <MessageSender
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            key={friend._id}
            className="with-border"
            craneUser={friend}
            mainOwner={ownerOfApp}
            messageProfile={
              <DirectMessageProfile
                user={friend}
                bio={`This space is just for you. Jot down notes, list your to-dos, or keep links and files handy. You can also talk to yourself here,but please bear in mind you’ll have to supply both sides of the conversation.`}
                hiUserSize={60}
                ownerOfApp={ownerOfApp}
              />
            }
            headerProfile={<HeaderProfile directMessage={true} user={friend} />}
            friends={friends}
            showProfileEditor={showProfileEditor}
            receiverId={friend._id}
          />
        )
      }

      return false
    })
  }

  const channelPage = (propChannel) => {
    return Object.values(channelList)?.map((channel) => {
      if (propChannel._id === channel._id) {
        return (
          <MessageSender
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            key={channel._id}
            className="with-border"
            mainOwner={ownerOfApp}
            receiverId={channel._id}
            craneUser=""
            messageProfile={<ChannelProfile {...channel} />}
            headerProfile={<HeaderProfile directMessage={false} channelName={channel.name} isPublic={channel.isPublic} />}
            friends={friends}
            showProfileEditor={showProfileEditor}
            channelId={channel._id}
          />
        )
      }
      return false
    })
  }

  return (
    <div className="main-layout">
      <Sidebar
        friends={friends}
        setDirectMessageUser={setDirectMessageUser}
        ownerOfApp={ownerOfApp}
        channelList={channelList}
        setChannelList={setChannelList}
        setOpenChannel={setOpenChannel}
      />

      <div className="layout-container">
        {!openChannel ? messageSenderPage(directMessageUser) : channelPage(directMessageUser)}
        {Component ? <Component /> : null}
      </div>

      <ProfileSetup
        edit="Edit"
        user={ownerOfApp}
        workSpaceOwner={<div className="workspace-owner d-flex align-items-center fw-bold fs-6-7">Workspace Owner</div>}
        addName={
          <div className="add-name d-flex align-items-center fw-normal cursor-pointer">
            <HiPlus className="pr-2" />
            Add name pronunciation
          </div>
        }
        setStatus="Set a Status"
        email={
          <ContactItem
            itemIcon={<MdOutlineMail size={22} />}
            itemName="Email Address"
            itemValue={
              <Link
                underline="none"
                href={`mailto:${ownerOfApp?.email}?subject=Mail from Our Site`}
                target="_blank"
                className="edit"
              >
                {ownerOfApp?.email}
              </Link>
            }
          />
        }
        phone={
          <ContactItem
            itemIcon={<BsTelephone size={18} />}
            itemName="phone"
            itemValue={
              <div className="add-name d-flex align-items-center fw-normal">
                <HiPlus className="pr-1" />
                <Link underline="none" target="_blank" href="tel:+91-9909756426" className="edit ">
                  Add Phone
                </Link>
              </div>
            }
          />
        }
        profileEditor={profileEditor}
        hideProfileEditor={HideProfileEditor}
      />
    </div>
  )
}

export default MainLayout
