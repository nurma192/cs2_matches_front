import type React from 'react';
import {Link} from "react-router-dom";
import MyButton from "../ui/MyButton";

type Props = {
    children: React.ReactNode;
    icon: JSX.Element;
    href: string;
}

const NavButton = ({children, icon, href}: Props) => {
    return (
        <MyButton fullWidth={true} className="flex justify-start text-xl py-2 bg-transparent hover:bg-opacity-20 hover:bg-secondary" icon={icon}>
            <Link to={href} className="size-full flex items-center">
                {children}
            </Link>
        </MyButton>
    );
};

export default NavButton;