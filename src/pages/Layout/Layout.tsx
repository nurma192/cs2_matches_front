import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppSelector } from "../../app/hooks";
import { type RootState } from "../../store/store";
import { MAPS } from "../../consts/maps";
import { useEffect } from "react";

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const match = useAppSelector((state: RootState) => state.match.match);

    useEffect(() => {
        if (location.pathname.includes("/match/") && match == null) {
            navigate('/');
        }
    }, [location, match, navigate]);

    const style =
        location.pathname.includes("/match/") && match
            ? {
                backgroundImage: `linear-gradient(-180deg, rgba(27, 27, 39, 0.8), #1b1b27), url("/images/maps/${MAPS[match.mapId].image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
            }
            : {};

    return (
        <div className="dark text-foreground w-full bg-[#10101b] bg-img-inherit" style={style}>
            <Header />
            <Outlet />
        </div>
    );
}

export default Layout;
