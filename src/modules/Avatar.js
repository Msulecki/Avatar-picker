import React, { useState, useEffect, useRef } from 'react';

import '../styles/Avatar.scss'

function Avatar(props) {
    const [popover, setPopover] = useState(false)
    const [newavatar, setAvatar] = useState(props.data[0])
    const popoverNode = useRef()
    const avatarNode = useRef()
    const popoverStyle = {
        animation: `${popover ? 'popover .3s forwards' : ''}`
    }

    const handleAvatarChange = (target, avatar) => {
        if (newavatar.id !== avatar.id) {
            target.style.animation = 'fetching 1s linear infinite'
            setTimeout(() => {
                setPopover(false)
                setAvatar(avatar)
                target.style.animation = ''
            }, 1500)
        }
    }

    const avatarList = [...props.data].map(avatar => <li
        tabIndex={0}
        key={avatar.id}
        onFocus={() => setPopover(true)}
        onClick={e => handleAvatarChange(e.target, avatar)}
        onKeyDown={e => e.keyCode === 13 && handleAvatarChange(e.target.children[0], avatar)}
        className="avatar__popover-pick"><div className="border border--big"></div><img src={`/img/${avatar.src}`} alt={avatar.label} /></li>)

    const initialAvatar = <div ref={avatarNode} className="avatar__image"
        tabIndex={0}
        onClick={() => setPopover(!popover)}
    ><div className='border'></div><img src={`/img/${newavatar.src}`} alt={newavatar.label} /></div>

    const avatarPopover = <div ref={popoverNode} className="avatar__popover" style={popoverStyle}>
        <div className="avatar__popover-triangle"></div>
        <h5>Choose your avatar</h5>
        <ul className="avatar__popover-list">
            {avatarList}
        </ul>
    </div>

    const handlePopover = e => {
        !popoverNode.current.contains(e.target) && !avatarNode.current.contains(e.target) && setPopover(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handlePopover);
        return () => {
            document.removeEventListener("mousedown", handlePopover);
        }
    }, [])

    return (
        <div className="avatar" >
            {initialAvatar}
            {avatarPopover}
        </div>
    )
}
export default Avatar