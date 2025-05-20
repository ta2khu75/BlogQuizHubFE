"use client"
import RichTextEditor from '@/components/common/RichTextEditor/RichTextEditor'
import React, { useState } from 'react'

const Text = () => {
    const [value, setValue] = useState("")
    return (
        <RichTextEditor placeholder='Select Blog' value={value} name='blog' onChange={(value) => setValue(value)} />
    )
}

export default Text 