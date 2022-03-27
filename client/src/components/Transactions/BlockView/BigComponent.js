import { Typography } from '@material-ui/core'
import React from 'react'

const BigComponent = ({ title, data,text }) => {
    return (
        <div className="col-3 mb-3">
            <Typography variant="h6">{title}</Typography>
            <Typography
                variant="h6" className={text} >{data}</Typography>
        </div>
    )
}

export default BigComponent;