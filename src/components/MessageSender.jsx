import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import Header from './Header'
import Sender from './Sender'
import MessageSenderEditor from './MessageSenderEditor'
import axios from '../components/api/message'
import { getDifferedState } from './api/utils'
import { Backdrop, CircularProgress } from '@mui/material'

const MessageSender = ({
  craneUser,
  friends,
  showProfileEditor,
  messageProfile,
  headerProfile,
  channelId,
  mainOwner,
  receiverId,
  chatMessage,
  setChatMessage,
}) => {
  const [loading, setLoading] = useState()
  const [editingMode, setEditingMode] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [editorId, setEditorId] = useState('')
  const [editorLocalKey, setEditorLocalKey] = useState('')
  const blocksFromHTML = convertFromHTML(``)
  const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)


  const editorRef = useRef()


  const getAllMessage = async () => {
    setDataLoading(true)
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 500)
    )
    const response = await axios.get(
      `/message?senderId=${mainOwner._id}&receiverId=${receiverId}&channelId=${channelId || ''}` // TODO: ahiya sender ne receiver ma _id aavse user ni
    )
    const newMsgs = {}
    for (const msg of response?.data || []) {
      newMsgs[msg._id] = msg
    }
    setChatMessage(newMsgs)

    setDataLoading(false)
  }

  useEffect(() => {
    if (receiverId) {
      getAllMessage()
    }
  }, [])

  const [editorState, setEditorState] = useState(EditorState.createWithContent(state))

  let messageLength = editorState?.getCurrentContent().getPlainText('\u0001')?.trim()?.length

  const content = editorState?.getCurrentContent()
    ? stateToHTML(editorState?.getCurrentContent(), {
      inlineStyles: {
        // Override default element (`strong`).

        BOLD: { attributes: { className: 'bold' } },
        ITALIC: {
          // Add custom attributes. You can also use React-style `className`.
          attributes: { className: 'italic' },
        },
        UNDERLINE: {
          attributes: { className: 'underline' },
        },
        STRIKETHROUGH: { attributes: { className: 'strikeThrough' } },
        CODE: {
          // Add custom attributes. You can also use React-style `className`.
          attributes: { className: 'monoSpace' },
        },
        SUPERSCRIPT: { attributes: { className: 'superScript' } },
        SUBSCRIPT: { attributes: { className: 'subScript' } },

        // Use a custom inline style. Default element is `span`.
      },
    })
    : ''

  const sendMessage = async () => {
    const randomId = Math.floor(new Date().valueOf() * Math.random())
    let clonedMessages = { ...chatMessage }


    try {
      const duplicateMessage = {
        localId: randomId,
        _id: randomId,
        message: content,
        messageTime: new Date(),
        senderId: mainOwner._id,
        receiverId: receiverId,
      }
      clonedMessages[randomId] = { ...duplicateMessage }
      setEditorState(EditorState.createEmpty())

      setChatMessage(clonedMessages)
      setLoading(true)
      clonedMessages[randomId].sending = true;

      const data = {
        message: content,
        senderId: mainOwner._id,
        receiverId: receiverId,
        channelId: channelId || '',
        localId: randomId,
      }

      const response = await axios.post('/message', data)

      const newID = response._id

      clonedMessages = { ...(await getDifferedState(setChatMessage)) }
      clonedMessages[randomId].sending = false
      clonedMessages[randomId]._id = newID
    } catch (error) {
      clonedMessages = { ...(await getDifferedState(setChatMessage)) }
      clonedMessages[randomId].sending = false
      clonedMessages[randomId].sendingError = true
      toast.error(error.message)
    }

    setChatMessage(clonedMessages)

    setLoading(false)
  }

  const resendMessage = async (_id, localKey) => {
    let clonedMessages = { ...chatMessage }


    clonedMessages[localKey].sending = true
    clonedMessages[localKey].sendingError = false
    setLoading(true)

    try {
      let oldMessage = clonedMessages[localKey].message
      const response = await axios.post('/message', { message: oldMessage })

      clonedMessages[localKey]._id = response._id
      clonedMessages[localKey].sending = false
      clonedMessages[localKey].sendingError = false

      toast.success(response.success)
    } catch (error) {
      clonedMessages[localKey].sending = false
      clonedMessages[localKey].sendingError = true
      toast.error(error.message)
    }
    setLoading(false)
    setChatMessage(clonedMessages)
  }

  const editMessage = async (_id, localKey) => {
    const messageWannaEdit = chatMessage[localKey].message
    const blocksFromHtml = messageWannaEdit
    const html = blocksFromHtml
    const blocksFromHTML = convertFromHTML(html)
    const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
    setEditingMode(true)
    setEditorId(_id)
    setEditorLocalKey(localKey)
    setEditorState(EditorState.createWithContent(content))
    setChatMessage(chatMessage)
  }

  const updateMessage = async (_id, localKey) => {
    setEditingMode(false)
    let clonedMessages = { ...chatMessage }
    try {
      clonedMessages[localKey].isUpdating = true
      setChatMessage(clonedMessages)
      setLoading(true)
      const data = { message: content, _id, localId: localKey }
      setEditorState(EditorState.createEmpty())
      const response = await axios.put('/message', data)

      clonedMessages[localKey].message = content
      clonedMessages[localKey].isUpdating = false
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
      setEditingMode(false)
      setEditorState(EditorState.createEmpty())
      clonedMessages[localKey].isUpdating = false
    }
    setChatMessage(clonedMessages)
    setLoading(false)
  }

  const deleteMessage = async (_id, localKey) => {
    setLoading(true)
    let craneMessages = { ...chatMessage }

    craneMessages[localKey].isDeleting = true
    if (craneMessages[localKey]?.sendingError) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve()
        }, 1000)
      )
      craneMessages[localKey].isDeleting = false
      delete craneMessages[localKey]
    } else {
      try {

        await axios.delete(`/message?id=${_id}&localId=${localKey}`)
        craneMessages[localKey].isDeleting = false

        delete craneMessages[localKey]
        setChatMessage(craneMessages)
        toast.success('message deleted')
      } catch (err) {
        craneMessages[localKey].isDeleting = false
        toast.error(err.message)
      }
    }
    setChatMessage(craneMessages)
    setLoading(false)
  }

  for (const messageKey of Object.keys(chatMessage)) {
    chatMessage[messageKey] = {
      ...chatMessage[messageKey],
      localKey: messageKey,
    }
  }

  return (

    dataLoading ?
      (<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={dataLoading}>
        <div className="flex-center flex-column">
          <CircularProgress color="inherit" />
          <span className="mt-2">Loading Messages...</span>
        </div>
      </Backdrop>)
      : (<>
        <Header headerProfile={headerProfile} />
        <div className=" messenger d-flex flex-center ">
          <div className="d-flex flex-column messages-container mt-auto">
            {messageProfile}

            <Sender
              showProfileEditor={showProfileEditor}
              mainOwner={mainOwner}
              craneUser={craneUser}
              chatMessage={chatMessage}
              resendMessage={resendMessage}
              editMessage={editMessage}
              deleteMessage={deleteMessage}
              channelId={channelId}
              friends={friends}
            />
          </div>
          <MessageSenderEditor
            editorState={editorState}
            setEditorState={setEditorState}
            messageLength={messageLength}
            sendMessage={sendMessage}
            messageReceiverName={craneUser.name}
            friends={friends}
            ownerUserName={mainOwner.name}
            username={craneUser.name}
            editingMode={editingMode}
            setEditingMode={setEditingMode}
            updateMessage={updateMessage}
            editorId={editorId}
            editorLocalKey={editorLocalKey}
            editorRef={editorRef}
          />
        </div>
      </>)


  )
}

export default MessageSender
