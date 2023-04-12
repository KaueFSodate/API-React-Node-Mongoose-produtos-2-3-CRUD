import styles from './Message.module.css'
import {useState, useEffect} from 'react'
import bus from '../../utils/bus'

function Message() {
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')
    const [visivel, setVisivel] = useState(false)

    useEffect(() => {
         bus.addListener('flash', ({message, type}) => {
            setVisivel(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisivel(false)
            }, 3000)
         })
    }, [])

  return (
    visivel && (
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
    
  )
}

export default Message