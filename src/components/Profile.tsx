import {useAppSelector} from "../app/hooks";
import {selectCurrentUser} from "../app/features/user/userSlice";
import {Card, CardHeader, Image, CardBody} from "@nextui-org/react"
import {BASE_URL} from "../constants";
import {Link} from "react-router-dom";

const Profile = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    if (!currentUser) {
        return null
    }

    const {firstname, lastname, avatar_url, id, email, username} = currentUser
    return (
        <Card className="py-4 w-[302px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <Image
                    alt="Card Profile"
                    className="object-cover rounded-xl"
                    src={`${avatar_url}`}
                    width={370}
                />
            </CardHeader>
            <CardBody className="px-4">
                <Link to={`users/${id}`}>
                    <h4 className="font-bold text-large mb-2">{`${firstname} ${lastname} (@${username})`} </h4>
                    <p className="text-default flex items-center gap-2">
                        <span>{email}</span>
                    </p>
                </Link>
            </CardBody>
        </Card>
    );
};

export default Profile;