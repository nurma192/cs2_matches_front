import {Outlet} from "react-router-dom";
import Container from "../../components/Container";
import Header from "./Header";

function Layout() {
    return (
        <div className={"w-full bg-[#10101b]"}>
            <Container>
                <>
                    <Header/>
                    <Outlet />
                </>
            </Container>
        </div>
    );
}

export default Layout;
