const ContactItem = ({ itemIcon, itemName, itemValue }) => {
  return (
    <div className="email-container d-flex px-1 pt-4 align-items-center">
      <div className="email-icon flex-center">{itemIcon}</div>
      <div className="email d-flex flex-column">
        <div className="fs-7 fw-bold">{itemName}</div>
        <div className="edit fs-6">{itemValue}</div>
      </div>
    </div>
  )
}

export default ContactItem
