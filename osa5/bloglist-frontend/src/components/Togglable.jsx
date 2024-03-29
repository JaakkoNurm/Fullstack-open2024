import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? ''  : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className='togglable'>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>new blog</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable