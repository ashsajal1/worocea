import React from 'react'

export default function ErrorText({ text }: { text: string }) {
    return (
        <p className='text-sm text-red-600'>{text}</p>
    )
}
