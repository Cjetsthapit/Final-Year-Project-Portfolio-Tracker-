import { Typography } from '@material-ui/core'
import React from 'react'

const SmallComponent = ({ title, data,text }) => {
    return (
        <div className="col-4 mb-3">
            <Typography variant="h6">{title}</Typography>
            <Typography
                variant="h6" className={text}>{data}</Typography>
        </div>
    )
}

export default SmallComponent