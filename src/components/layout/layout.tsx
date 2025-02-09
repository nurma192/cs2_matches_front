import {Outlet} from "react-router-dom";
import Container from "../Container";
import Header from "./header";
import NavBar from "../nav-bar/navbar";
import {useAppSelector} from "../../app/hooks";
import {selectCurrentUser, selectUser} from "../../app/features/user/userSlice";
import Profile from "../Profile";
import {useCurrentUserQuery} from "../../app/features/user/userApi";
import {Skeleton, Card} from "@nextui-org/react"

const Layout = () => {
    const {isLoading} = useCurrentUserQuery()
    const user = useAppSelector(selectUser)

    return (
        <>
            <Header/>

            <Container>
                <>
                    <div className="flex-2 p-4">
                        <NavBar/>
                    </div>

                    <div className="flex-1 p-4 ">
                        <Outlet/>
                    </div>
                    <div className="flex-2 p-4">
                        <div className="flex-col.flex.gap-5">
                            {!user && <Profile/>}
                            {!user && isLoading && (
                                <Card className={`p-4 rounded-xl flex flex-col gap-3`}>
                                    <Skeleton className={"w-[270px] h-[270px] rounded-xl"}></Skeleton>
                                    <Skeleton className={"w-[270px] h-[50px] rounded-xl"}></Skeleton>
                                    <Skeleton className={"w-[170px] h-[30px] rounded-xl"}></Skeleton>
                                </Card>
                            )}
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
};

export default Layout;