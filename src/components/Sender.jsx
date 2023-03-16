import * as React from 'react'
import { useMemo, useState } from 'react'
import { HiUser } from 'react-icons/hi'
import { RiArrowDownSLine, RiDeleteBin6Fill } from 'react-icons/ri'
import { Button, CircularProgress } from '@mui/material'
import { TiEdit } from 'react-icons/ti'
import { GrPowerReset } from 'react-icons/gr'
import moment from 'moment'
import CraneTooltip from './utils/CraneTooltip'
import WorkSpaceInfo from './WorkSpaceInfo'
import CircularProgressBar from './utils/CircularProgressBar'

const Sender = ({
  mainOwner,
  craneUser,
  chatMessage,
  resendMessage,
  editMessage,
  deleteMessage,
  showProfileEditor,
  channelId,
  friends
}) => {
  const chats = Object.values(chatMessage)
  const [findUser, setFindUser] = useState({})

  const SenderMessage = ({ chatMessage }) => {
    const allMessages = useMemo(() => {
      return chats.map((msg, i) => {
        if (!(msg.senderId === mainOwner._id)) {
          if (channelId?.length) {
            const member = friends?.find(({ _id }) => _id === msg.senderId)
            setFindUser(member);
          }

          return (chats[i].senderId !== chats[i - 1]?.senderId) ? (
            <div className="msg-container d-flex position-relative receiver-side-message flex-row-reverse" key={msg.localKey}>
              <CraneTooltip
                placement="top"
                arrow={false}
                title={<WorkSpaceInfo user={!channelId?.length ? craneUser : findUser} workspaceOwner="Workspace Owner" setStatus="Set a Status" />}
                content={
                  <div className="sender-profile-image cursor-pointer" alt="">
                    {channelId?.length ?
                      findUser?.profileImage ? <img src={findUser?.profileImage} alt="" /> : <HiUser size={40} />
                      : craneUser?.profileImage ? <img src={craneUser?.profileImage} alt="" /> : <HiUser size={40} />}
                  </div>
                }
              />

              <div className="sender d-flex flex-column position-relative">
                <div className="d-flex sender-name-time align-items-end receiver-name-time ">
                  <CraneTooltip
                    title={
                      <div className="flex-center flex-column">
                        <span className="fs-7 fw-bold">
                          {moment(msg.messageTime).format('MMM Do')} at {moment(msg.messageTime).format('LTS')}
                        </span>
                      </div>
                    }
                    content={
                      <div className="sender-message-time fs-7 mr-2 cursor-pointer">
                        {moment(msg.messageTime).format('LT')}
                      </div>
                    }
                  />
                  <CraneTooltip
                    placement="top"
                    arrow={false}
                    title={<WorkSpaceInfo user={!channelId?.length ? craneUser : findUser} workspaceOwner="Workspace Owner" setStatus="Set a Status" />}
                    content={
                      <div className="sender-name fw-bold cursor-pointer" onClick={showProfileEditor}>
                        {!channelId?.length ? craneUser.name : findUser.name}

                      </div>
                    }
                  />
                </div>
                <div className="sender-first-message text-break">
                  <div className="d-flex align-items-center flex-row-reverse">
                    <span
                      className="message-format"
                      dangerouslySetInnerHTML={{
                        __html: `${msg.message}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="sender-message d-flex align-items-center position-relative receiver" key={msg._id}>
              <div className="message text-break d-flex justify-content-between flex-row-reverse w-100">
                {' '}
                <div className="d-flex align-items-center">
                  <span
                    className="message-format"
                    dangerouslySetInnerHTML={{
                      __html: `${msg.message}`,
                    }}
                  />
                </div>

              </div>
              <CraneTooltip
                title={
                  <div className="flex-center flex-column">
                    <span className="fs-7 fw-bold">
                      {moment(msg.messageTime).format('MMM Do')} at {moment(msg.messageTime).format('LTS')}
                    </span>
                  </div>
                }
                content={
                  <div className="sender-message-time cursor-pointer receiver-message-time">
                    {moment(msg.messageTime).format('LT').substring(0, 5)}
                  </div>
                }
              />
            </div>
          )
        } else {
          return (chats[i].senderId !== chats[i - 1]?.senderId) ? (
            <div className="msg-container d-flex position-relative" key={msg._id}>
              <CraneTooltip
                placement="top"
                arrow={false}
                title={<WorkSpaceInfo user={mainOwner} workspaceOwner="Workspace Owner" setStatus="Set a Status" />}
                content={
                  <div className="sender-profile-image cursor-pointer" alt="">
                    {mainOwner.profileImage ? <img src={mainOwner.profileImage} alt="" /> : <HiUser size={40} />}
                  </div>
                }
              />

              <div className="sender d-flex flex-column position-relative">
                <div className="d-flex sender-name-time align-items-end ">
                  <CraneTooltip
                    placement="top"
                    arrow={false}
                    title={<WorkSpaceInfo user={mainOwner} workspaceOwner="Workspace Owner" setStatus="Set a Status" />}
                    content={
                      <div className="sender-name fw-bold cursor-pointer" onClick={showProfileEditor}>
                        {mainOwner.name}
                      </div>
                    }
                  />
                  <CraneTooltip
                    title={
                      <div className="flex-center flex-column">
                        <span className="fs-7 fw-bold">
                          {moment(msg.messageTime).format('MMM Do')} at {moment(msg.messageTime).format('LTS')}
                        </span>
                      </div>
                    }
                    content={
                      <div className="sender-message-time fs-7 ml-2 cursor-pointer">
                        {moment(msg.messageTime).format('LT')}
                      </div>
                    }
                  />
                </div>
                <div className="sender-first-message text-break">
                  <div className="d-flex align-items-center">
                    <span
                      className="message-format"
                      dangerouslySetInnerHTML={{
                        __html: `${msg.message}`,
                      }}
                    />
                    {msg?.sending ? (
                      <CircularProgressBar
                        content="Message Sending"
                        circularProgress={
                          <CircularProgress size={15} className="ml-2 cursor-pointer" style={{ color: 'white' }} />
                        }
                      />
                    ) : null}
                    {msg?.isUpdating ? (
                      <CircularProgressBar
                        content="Message updating"
                        circularProgress={
                          <CircularProgress size={15} className="ml-2 cursor-pointer" style={{ color: 'green' }} />
                        }
                      />
                    ) : null}
                    {msg?.sendingError ? (
                      <CircularProgressBar
                        content="retry"
                        circularProgress={
                          <GrPowerReset className="ml-2 grow-power-reset" size={15} onClick={() => resendMessage(msg._id, msg.localKey)} />
                        }
                      />
                    ) : null}
                    {msg?.isDeleting ? (
                      <CircularProgressBar
                        content=" message deleting"
                        circularProgress={
                          <CircularProgress size={15} className="ml-2 cursor-pointer" style={{ color: 'red' }} />
                        }
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              {!msg?.sending && !msg.isDeleting && !msg.isUpdating ? (
                <div className="edit-delete-icon position-absolute">
                  <CraneTooltip
                    title={<span className="fs-7 fw-bold">Edit</span>}
                    content={
                      <Button
                        className={`edit-message cursor-pointer flex-center`}
                        onClick={() => editMessage(msg._id, msg.localKey)}
                      >
                        <TiEdit size={20} />
                      </Button>
                    }
                  />
                  <CraneTooltip
                    title={<span className="fs-7 fw-bold">Delete</span>}
                    content={
                      <Button
                        className={`delete-message cursor-pointer flex-center `}
                        onClick={() => deleteMessage(msg._id, msg.localKey)}
                      >
                        <RiDeleteBin6Fill size={20} />
                      </Button>
                    }
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="sender-message d-flex align-items-center position-relative" key={msg._id}>
              <CraneTooltip
                title={
                  <div className="flex-center flex-column">
                    <span className="fs-7 fw-bold">
                      {moment(msg.messageTime).format('MMM Do')} at {moment(msg.messageTime).format('LTS')}
                    </span>
                  </div>
                }
                content={
                  <div className="sender-message-time cursor-pointer ">
                    {moment(msg.messageTime).format('LT').substring(0, 5)}
                  </div>
                }
              />
              <div className="message text-break d-flex justify-content-between w-100">
                {' '}
                <div className="d-flex align-items-center">
                  <span
                    className="message-format"
                    dangerouslySetInnerHTML={{
                      __html: `${msg.message}`,
                    }}
                  />
                  {msg.sending ? (
                    <CircularProgressBar
                      content="Message Sending"
                      circularProgress={
                        <CircularProgress size={15} className="ml-2 cursor-pointer" style={{ color: 'white' }} />
                      }
                    />
                  ) : null}
                  {msg?.isUpdating ? (
                    <CircularProgressBar
                      content="Message updating"
                      circularProgress={
                        <CircularProgress size={15} className="ml-2 cursor-pointer" style={{ color: 'green' }} />
                      }
                    />
                  ) : null}
                  {msg?.sendingError ? (
                    <CircularProgressBar
                      content="retry"
                      circularProgress={
                        <GrPowerReset className="ml-2 grow-power-reset" size={15} onClick={() => resendMessage(msg._id, msg.localKey)} />
                      }
                    />
                  ) : null}
                  {msg?.isDeleting ? (
                    <CircularProgressBar
                      content=" message deleting"
                      circularProgress={
                        <CircularProgress size={15} className="ml-2 cursor-pointer" style={{ color: 'red' }} />
                      }
                    />
                  ) : null}
                </div>
                {!msg?.sending && !msg.isDeleting && !msg.isUpdating ? (
                  <div className="edit-delete-icon position-absolute">
                    <CraneTooltip
                      title={<span className="fs-7 fw-bold show-edit-delete">Edit</span>}
                      content={
                        <Button
                          className={`edit-message cursor-pointer flex-center`}
                          onClick={() => editMessage(msg._id, msg.localKey)}
                        >
                          <TiEdit size={20} />
                        </Button>
                      }
                    />
                    <CraneTooltip
                      title={<span className="fs-7 fw-bold show-edit-delete">Delete</span>}
                      content={
                        <Button
                          className={`delete-message cursor-pointer flex-center `}
                          onClick={() => deleteMessage(msg._id, msg.localKey)}
                        >
                          <RiDeleteBin6Fill size={20} />
                        </Button>
                      }
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )
        }
      })
    }, [chatMessage])

    return (
      <div className="sender-message-container d-flex flex-column">
        <div className="sender-message-header flex-center position-relative mb-3">
          <div className="message-duration flex-center cursor-pointer">
            <div className="fw-bold">{moment(new Date()).format('dddd, MMMM Do') || 'Today'}</div>
            <RiArrowDownSLine size={12} className="pl-1" />
          </div>
        </div>

        {allMessages}
      </div>
    )
  }

  return (
    Object.keys(chatMessage)?.length ? <SenderMessage chatMessage={chatMessage} /> : null
  )
}

export default Sender
