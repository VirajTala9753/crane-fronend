import CraneTooltip from './CraneTooltip'

const CircularProgressBar = ({ content, circularProgress }) => {
  return (
    <CraneTooltip
      title={
        <div className="flex-center flex-column">
          <span className="fs-7 fw-bold">{content}</span>
        </div>
      }
      content={circularProgress}
    />
  )
}

export default CircularProgressBar
