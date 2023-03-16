const UserStatus = ({ active, position }) => {
  return (
    <div
      className={`user-status ${active ? 'active' : 'not-active'} flex-center ${position}
    `}
    >
      {!active ? <div className="user-offline-status"></div> : null}
    </div>
  )
}
export default UserStatus
