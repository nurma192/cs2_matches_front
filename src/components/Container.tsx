import type React from 'react';

type Props = {
    children: React.ReactElement
}

const Container = ({children}: Props) => {
    return (
        <div className="flex w-full xl:w-11/12 2xl:w-10/12 mx-auto max-w-screen-2xl">
            {children}
        </div>
    );
};

export default Container;