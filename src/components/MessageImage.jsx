import React from 'react';

const MessageImage = ({ media }) => {
    if (!media) {
        return (
            <>Loading</>
        )
    }

    return (
        <div>
            {media.type === "video" ?
                <video src={media.url} controls="controls" className="message__video" />
                :
                <img src={media.url} alt="Message" className="message__img" />
            }
        </div>
    );
};

export default MessageImage;