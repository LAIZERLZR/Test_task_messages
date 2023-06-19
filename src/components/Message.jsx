import React, { useState } from 'react';
import MessageImage from './MessageImage';

const Message = ({ message }) => {

    const [count, setCount] = useState(0);
    const ids = JSON.parse(localStorage.getItem('ids')) || [];

    const onChangeFavorite = (id) => {
        setCount((prevState) => prevState + 1);
        const index = ids.indexOf(id);
        if (index !== -1) {
            ids.splice(index, 1);
        } else {
            ids.push(id);
        }
        localStorage.setItem('ids', JSON.stringify(ids));
    };

    return (
        <div className="message">
            <div className="message__header">
                <div className="message__user">
                    <div className="message__user-icon">
                        <img
                            src="imgs/user-icon.png"
                            alt="user logo"
                            className="message__user-logo"
                            width="36"
                            height="36"
                        />
                    </div>
                    <div className="message__user-info">
                        <p className="message__username">{message.author}</p>
                        <p className="message__message-type">{message.channel}</p>
                    </div>
                </div>
                <div onClick={() => onChangeFavorite(message.id)} className="message__header-icons">
                    {ids.includes(String(message.id))
                        ?
                        <img src="imgs/favorites-icon.png" alt="favorites" className="massage__favorites-btn" />
                        :
                        "unliked"
                    }
                    {/*  
                    Противоположного изображения не было, я решил вставить "unliked" 
                    < */}

                </div>
            </div>
            <div className="message__content">
                <div className="message__content-wrapper">
                    <p className="message__time">{message.date.slice(11, 16)}</p>
                    <p className="message__text">
                        {message.content}
                    </p>
                </div>

                {message.attachments[0] && <MessageImage media={message.attachments[0]} />}
            </div>
            <div className="message__tags">
                <ul className="message__tag-list">
                    <li className="message__tag-item">#Новое</li>
                    <li className="message__tag-item">#Эксперт</li>
                </ul>
            </div>
        </div>
    );
};

export default Message;