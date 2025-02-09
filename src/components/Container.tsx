import type React from 'react';

type Props = {
    children: React.ReactElement
}

const Container = ({children}: Props) => {
    return (
        <div className="flex flex-col w-full xl:w-11/12 2xl:w-10/12 mx-auto max-w-screen-2xl px-4">
            {children}
        </div>
    );
};

export default Container;