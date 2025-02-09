import type {CommentWithUser} from "../types/Comment";
import {Avatar, Card } from '@nextui-org/react';
import {formatTimeAgo} from "../utils/getData";

type Props = {
    comment: CommentWithUser;
}

function CommentCard({comment}: Props): JSX.Element {
    return (
        <Card className={`border-none shadow-none w-full rounded-md p-4 flex flex-row`}>
            <div className="">
                <Avatar src={comment.user.avatar_url} name={comment.user.id}/>
            </div>
            <div className="flex flex-col ml-3">
                <div className="flex items-center gap-2">
                    <p className={`text-base font-bold`}>{comment.user.firstname} {comment.user.lastname}</p>
                    <p className={`text-sm opacity-80`}>{formatTimeAgo(comment.created_at)}</p>
                </div>
                <p className={`text-sm`}>{comment.content}</p>
            </div>
        </Card>
    );
}

export default CommentCard;
