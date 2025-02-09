import React from 'react';

interface Props {
    src: string;
    onClick?: () => void;
    className?: string;
}

function MyMiniImage({src, onClick, className}: Props) {
    return (
        <div className={`w-[100px] h-[100px] bg-zinc-50 ${className}`} onClick={onClick}>
            <img className='w-full h-full object-cover' src={src} alt="image"/>
        </div>
    );
}

export default MyMiniImage;
