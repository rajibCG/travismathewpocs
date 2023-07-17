import PDPProductDetails from '@/components/PDP/PDPProductDetails/PDPProductDetails';
import PDPProductImages from '@/components/PDP/PDPProductImageGallery/PDPProductImages';

function PDPClient({ bloomreachData, hybrisData }) {

    return (
        <div className="flex flex-col w-full md:w-2/3 gap-5 lg:flex-row plp-wrapper">
            <PDPProductImages
                thumbImage={bloomreachData?.response?.docs[0]?.thumb_image}
                images={hybrisData?.images}
                title={bloomreachData?.response?.docs[0]?.title}
            ></PDPProductImages>

            <div className="w-full lg:w-1/3 lg:pl-2.5 md:w-full">
                <PDPProductDetails
                    bloomreachData={bloomreachData}
                    hybrisData={hybrisData}
                    productId={bloomreachData?.response?.docs[0]?.pid}
                    producturl={bloomreachData?.response?.docs[0]?.url}
                    title={bloomreachData?.response?.docs[0]?.title}
                    price={bloomreachData?.response?.docs[0]?.price}
                ></PDPProductDetails>
            </div>
        </div>
    );
}

export default PDPClient;