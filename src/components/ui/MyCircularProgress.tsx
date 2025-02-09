import {CircularProgress} from "@nextui-org/react";

interface Props {
    size?: "sm" | "md" | "lg" | undefined;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    className?: string;
}

const MyCircularProgress = ({size = "md", color = "primary", className}: Props) => {
    return (
        <CircularProgress size={size} color={color} className={className}/>
    )
}

export default MyCircularProgress;
