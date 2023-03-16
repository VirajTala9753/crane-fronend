import DirectMessageProfile from './utils/DirectMessageProfile'
import LocalTime from './utils/LocalTime'

const WorkSpaceInfo = ({ workspaceOwner, setStatus, user }) => {
  return (
    <div className="workspace-info d-flex flex-column cursor-">
      {workspaceOwner ? <div className="workspace-owner fs-7">{workspaceOwner}</div> : null}

      <div className="owner-profile">
        <DirectMessageProfile user={user} hiUserSize={36} />
      </div>
      <div className="local-time d-flex flex-column p-3 ">
        <LocalTime />
        <div className="status-update-setting align-self-center mt-3 cursor-pointer fs-7 d-flex justify-content-center">
          {setStatus}
        </div>
      </div>
    </div>
  )
}

export default WorkSpaceInfo
