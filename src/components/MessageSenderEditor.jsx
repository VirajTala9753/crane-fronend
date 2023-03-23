import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { Button } from '@mui/material'
import CraneTooltip from './utils/CraneTooltip'
import ListItem from './ListItem'
import ProfileStatus from './utils/ProfileStatus'

const getIcon = (iconName) => `icons/message-sender/${iconName}.svg`

const MessageSenderEditor = ({
  messageLength,
  sendMessage,
  editorState,
  setEditorState,
  messageReceiverName,
  friends,
  username,
  ownerUserName,
  editingMode,
  setEditingMode,
  updateMessage,
  editorId,
  editorLocalKey,
  editorRef,
}) => {
  const [editorFocus, setEditorFocus] = useState(false)
  const [showToolbar, setShowToolbar] = useState(true)
  const [state, setState] = useState(EditorState.createEmpty())

  const saveMessage = () => {
    updateMessage(editorId, editorLocalKey)
  }

  const toolbarHide = () => {
    setShowToolbar(!showToolbar)
  }

  const { hasCommandModifier } = KeyBindingUtil

  function myKeyBindingFn(e) {
    if (e.keyCode === 13 /* `S` key */ && hasCommandModifier(e)) {
      return 'myeditor-save'
    }
    return getDefaultKeyBinding(e)
  }

  // const handleKeyDown = (event) => {
  //   console.log('handlekey fun')
  //   if (event.key === 'Enter') {
  //     sendMessage()
  //   }
  // }
  function handleKeyCommand(command) {
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqq', command)
    if (command === 'split-block') {
      sendMessage()
      console.log('asdfghnbvfghjnbghn')
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <div className={`message-sender d-flex flex-column w-100 ${editorFocus ? 'focus-message-sender' : ''}`}>
      <Editor
        editorState={editorState}
        toolbarClassName={`message-sender-toolbar ${showToolbar ? '' : 'hide'}`}
        wrapperClassName="message-sender-wrapper"
        editorClassName="message-sender-textarea"
        onEditorStateChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={myKeyBindingFn}
        spellCheck="true"
        ref={editorRef}
        onFocus={() => setEditorFocus(true)}
        onBlur={() => setEditorFocus(false)}
        placeholder={username === ownerUserName ? 'jot something down' : `message ${messageReceiverName}`}
        customStyleMap={{
          CODE: {
            fontFamily: 'monospace',
            overflowWrap: 'break-word',
            background: 'rgb(34, 37, 41)',
            borderRadius: '3px',
            color: 'rgb(232, 145, 45)',
            border: '1px solid rgb(60, 62, 66)',
            padding: '1px 3px',
          },
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            {
              text: (
                <ListItem
                  className="with-border"
                  prefix={
                    <ProfileStatus
                      active={true}
                      src="https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg"
                    />
                  }
                  content="rashmika.piyush143"
                  postfix="you"
                />
              ),
              value: 'rashmika.piyush143',
              url: '',
            },
            {
              text: (
                <ListItem
                  className="with-border"
                  prefix={<ProfileStatus active={friends[0]?.active} src={friends[0]?.profileImage} />}
                  content={friends[0]?.name}
                  postfix="you"
                />
              ),
              value: friends[0]?.name,
              url: '',
            },
            {
              text: (
                <ListItem
                  className="with-border"
                  prefix={<ProfileStatus active={friends[1]?.active} src={friends[1]?.profileImage} />}
                  content={friends[1]?.name}
                  postfix="you"
                />
              ),
              value: friends[1]?.name,
              url: '',
            },
            {
              text: (
                <ListItem
                  className="with-border"
                  prefix={<ProfileStatus active={friends[2]?.active} src={friends[2]?.profileImage} />}
                  content={friends[2]?.name}
                  postfix="you"
                />
              ),
              value: friends[2]?.name,
              url: '',
            },
          ],
        }}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        toolbar={{
          options: ['inline', 'list', 'link', 'remove', 'history'],
          inline: {
            inDropdown: false,
            className: 'message-sender-inline-wrapper',
            icon: getIcon('bold'),
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
            bold: {
              icon: getIcon('bold'),
              className: 'sender-toolbar-icon',
            },
            italic: {
              icon: getIcon('italic'),
              className: 'sender-toolbar-icon',
            },
            underline: {
              icon: getIcon('underline'),
              className: 'sender-toolbar-icon',
            },
            strikethrough: {
              icon: getIcon('strikethrough'),
              className: 'sender-toolbar-icon',
            },
            monospace: {
              icon: getIcon('monospace'),
              className: 'sender-toolbar-icon',
            },
            superscript: {
              icon: getIcon('superscript'),
              className: 'sender-toolbar-icon',
            },
            subscript: {
              icon: getIcon('subscript'),
              className: 'sender-toolbar-icon',
            },
          },
          list: {
            inDropdown: false,
            className: 'message-sender-inline-wrapper',
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
            unordered: {
              icon: getIcon('unordered'),
              className: 'sender-toolbar-icon',
            },
            ordered: {
              icon: getIcon('ordered'),
              className: 'sender-toolbar-icon',
            },
          },
          link: {
            inDropdown: false,
            className: 'message-sender-inline-wrapper',
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link', 'unlink'],
            link: {
              icon: getIcon('link'),
              className: 'sender-toolbar-icon',
            },
            unlink: {
              icon: getIcon('unlink'),
              className: 'sender-toolbar-icon',
            },
            linkCallback: undefined,
          },
          remove: {
            icon: getIcon('remove'),
            className: 'message-sender-inline-wrapper icon',
          },
          history: {
            inDropdown: false,
            className: 'message-sender-inline-wrapper',
            dropdownClassName: undefined,
            options: ['undo', 'redo'],
            undo: {
              icon: getIcon('undo'),
              className: 'sender-toolbar-icon',
            },
            redo: {
              icon: getIcon('redo'),
              className: 'sender-toolbar-icon',
            },
          },
        }}
      />

      <div className="message-send-container d-flex align-items-center">
        <div className=" flex-center mr-auto">
          <CraneTooltip
            title={<span className="fs-7 fw-bold">Hide Formatting</span>}
            content={
              <div
                className={`ml-3 mb-2 hide-format ${showToolbar ? 'text-decoration-underline' : 'text-decoration-none'}`}
                onClick={toolbarHide}
              >
                Aa
              </div>
            }
          />
        </div>

        <div className="d-flex">
          {editingMode ? (
            <Button
              onClick={() => {
                setEditingMode(false)
                setEditorState(EditorState.createEmpty())
              }}
              // style={{ background: "black" }}
              onMouseDown={(e) => e.preventDefault()}
              className="cancel-btn"
            >
              Cancel
            </Button>
          ) : null}
          <div
            className={`d-flex ${messageLength || editingMode ? 'send-message-icon-active' : ''} send-message-icon  mr-1`}
          >
            {!editingMode ? (
              <Button
                onClick={sendMessage}
                disabled={!messageLength ? true : false}
                onMouseDown={(e) => e.preventDefault()}
                style={{ height: '28px' }}
              >
                <RiSendPlane2Fill size={17} />
              </Button>
            ) : (
              <Button
                className={!messageLength ? 'save-btn' : ''}
                onClick={saveMessage}
                onMouseDown={(e) => e.preventDefault()}
                disabled={!messageLength ? true : false}
              >
                save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
   )
 }


export default MessageSenderEditor
