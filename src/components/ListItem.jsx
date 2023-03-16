import React from 'react'
import { CgClose } from 'react-icons/cg'

const ListItem = ({ prefix, content, postfix, removable, className, selected, selectable = true, arrow }) => {
  return (
    <div
      className={`list-item-container d-flex justify-content-between align-items-center ${
        selectable && selected ? 'selected' : ''
      } ${className || ''}`}
    >
      <div className="list-item-content flex-center">
        <div className={`prefix flex-center ${!postfix ? 'status-icon' : ''}`}>{prefix}</div>
        <div className="content ">{content}</div>
        <div className="postfix">{postfix}</div>
        <div className="flex-center">{arrow}</div>
      </div>
      {removable ? (
        <div className="list-item-remove icon-with-hover flex-center">
          <CgClose />
        </div>
      ) : null}
    </div>
  )
}

export default ListItem
