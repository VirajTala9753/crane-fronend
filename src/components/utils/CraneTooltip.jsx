import React from 'react'
import { Tooltip, Zoom } from '@mui/material'

const CraneTooltip = ({ content, ...rest }) => {
  return (
    <Tooltip TransitionComponent={Zoom} arrow {...rest}>
      {content}
    </Tooltip>
  )
}

export default CraneTooltip
