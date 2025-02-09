import React from 'react';
import MyButton from "../../components/ui/MyButton";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()

    const handleCreateClick = () => {
        navigate("/create");
    }
    const handleLogoClick = () => {
        navigate("/");
    }
    return (
        <div className="flex justify-between items-center w-full py-4">
            <h1 className={"text-2xl font-bold cursor-pointer"} onClick={handleLogoClick}>Cs2 Matches</h1>
            <MyButton onClick={handleCreateClick} color={"primary"}>
                Create Match
            </MyButton>
        </div>
    );
}

export default Header;
