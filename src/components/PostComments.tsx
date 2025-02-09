import {useEffect, useState} from 'react';
import {useLazyGetPostCommentsQuery} from "../app/features/postComments/postCommentApi";
import {Card} from '@nextui-org/react';
import MyCircularProgress from "./ui/MyCircularProgress";
import type {CommentWithUser} from "../types/Comment";
import CommentCard from "./CommentCard";
import CreatePostComment from "../features/CreatePostComment";
import {FaAnglesDown} from 'react-icons/fa6';

type Props = {
    postId: number
}

function PostComments({postId}: Props) {
    const [comments, setComments] = useState<CommentWithUser[]>([])
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    const [getPostComments, {isLoading}] = useLazyGetPostCommentsQuery()


    useEffect(() => {
        if (!fetching) {
            return
        }
        if (maxPage <= page) {
            setFetching(false);
            return;
        }
        getPostComments({
            postId: postId,
            page: page + 1,
        })
            .then(req => {
                if (req.isSuccess) {
                    const newComments = req.data.result.result.comments || [];
                    setComments([
                        ...comments,
                        ...newComments,
                    ])
                    setPage(req.data.result.page)
                    setMaxPage(req.data.result.totalPages)
                }
            })
            .finally(() => {
                setFetching(false);
            })
    }, [fetching]);

    return (
        <Card className={`w-full rounded-md p-2 flex flex-col gap-2`}>
            <CreatePostComment postId={postId} comments={comments} setComments={setComments}/>
            {comments.length > 0 && comments.map(comment => (
                <CommentCard comment={comment} key={comment.id}/>
            ))}
            {!isLoading && maxPage > page && <div className={"w-full flex justify-center"}>
				<div
					className="p-1 cursor-pointer group hover:scale-110 rounded-full flex justify-center items-center border"
					onClick={() => setFetching(true)}
				>
					<FaAnglesDown className={'group-hover:scale-85 transition'}/>
				</div>
			</div>}
            {isLoading && <MyCircularProgress size={"md"}/>}
        </Card>
    );
}

export default PostComments;
