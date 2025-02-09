import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import type {Image} from "../types/Image";
import {Image as NextUiImage} from "@nextui-org/react"
import {useEffect, useRef, useState} from "react";

interface Props {
    images: Image[] | null
}

function ImageSlider({images}: Props) {
    const [mainImageId, setMainImageId] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement | HTMLButtonElement>) => {
        if (!!images && event.key === "ArrowLeft" && mainImageId > 0) {
            setMainImageId(prevState => prevState - 1);
        }
        if (!!images && event.key === "ArrowRight" && mainImageId < images.length - 1) {
            setMainImageId(prevState => prevState + 1);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const imageWidth = container.offsetWidth;
            container.scrollTo({
                left: mainImageId * imageWidth,
                behavior: "smooth"
            });
        }
    }, [mainImageId]);
    
    if (!images) {
        return null;
    }

    return (
        <div
            className="w-full flex focus:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className="w-full bg-transparent relative select-none">
                <button onClick={(e) => setMainImageId(prevState => prevState - 1)}
                        // disabled={images.length === 0 || mainImageId === 0}
                        className={`absolute h-[40px] m-auto cursor-pointer bottom-0 left-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden focus:outline-none`}>
                    {(images.length !== 0 && mainImageId !== 0) && <HiChevronLeft size="2rem" color={"white"}/>}
                </button>
                <button onClick={(e) => setMainImageId(prevState => prevState + 1)}
                        className={`absolute h-[40px] m-auto cursor-pointer bottom-0 right-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden focus:outline-none`}>
                    {images.length !== 0 && mainImageId !== images.length - 1 && <HiChevronRight size="2rem" color={'white'}/>}
                </button>

                <div className="flex items-center overflow-hidden" ref={containerRef}>
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                            <NextUiImage className='w-full h-full object-scale-down rounded'
                                 src={`${image.url}`}
                                 alt="addPhoto-scelet.svg"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageSlider;