
import Image from "next/image";

const PDPProductImages = ({ thumbImage, images, title }) => {
    const PDP_IMAGE_WIDTH = 400;
    const PDP_IMAGE_HEIGHT = 500;
    const PDP_IMAGE_QUALITY = 80;
    const bloomreachUrl = process.env.NEXT_PUBLIC_APP_BLOOMREACH_URL;

    if (images == undefined || images?.length === 0) {
        return (
            <Image
                src={thumbImage ? `${thumbImage}` : "/1x1.png"}
                alt={title ? title : "thumbnail"}
                width={PDP_IMAGE_WIDTH}
                height={PDP_IMAGE_HEIGHT}
                quality={PDP_IMAGE_QUALITY}
            />
        );
    }
    //
    return (
        <>
            <div className="pdp-product-images flex flex-col w-full md:w-2/3 gap-4">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 md:pr-2.5 mb-2.5 md:mb-0">
                        {images[0].url && (
                            <Image
                                src={
                                    images[0]
                                        ? `${bloomreachUrl + images[0].url}`
                                        : "/1x1.png"
                                }
                                alt={title ? title : "thumbnail"}
                                width={PDP_IMAGE_WIDTH}
                                height={PDP_IMAGE_HEIGHT}
                                quality={PDP_IMAGE_QUALITY}
                            />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2.5">
                        {images[1].url && (
                            <Image
                                src={
                                    images[1]
                                        ? `${bloomreachUrl + images[1].url}`
                                        : "/1x1.png"
                                }
                                alt={title ? title : "thumbnail"}
                                width={PDP_IMAGE_WIDTH}
                                height={PDP_IMAGE_HEIGHT}
                                quality={PDP_IMAGE_QUALITY}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 md:pr-2.5 mb-2.5 md:mb-0">
                        {images[2] && (
                            <Image
                                src={
                                    images[2].url
                                        ? `${bloomreachUrl + images[2].url}`
                                        : "/1x1.png"
                                }
                                alt={title ? title : "thumbnail"}
                                width={PDP_IMAGE_WIDTH}
                                height={PDP_IMAGE_HEIGHT}
                                quality={PDP_IMAGE_QUALITY}
                            />
                        )}
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2.5">
                        {images[3] && (
                            <Image
                                src={
                                    images[3].url
                                        ? `${bloomreachUrl + images[3].url}`
                                        : "/1x1.png"
                                }
                                alt={title ? title : "thumbnail"}
                                width={PDP_IMAGE_WIDTH}
                                height={PDP_IMAGE_HEIGHT}
                                quality={PDP_IMAGE_QUALITY}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default PDPProductImages;
