import { notFound } from "next/navigation";
import PDPClient from "./PDPClient";

export const dynamicParams = true;

export default async function PLPPage({ params }) {
    const productId = params.id;
    try {
        const bloomreachData = await fetch(
            `${process.env.BLOOMREACH_API_URL}/?account_id=${process.env.BLOOMREACH_ACCOUNT_ID}&auth_key=${process.env.BLOOMREACH_AUTH_KEY}&domain_key=${process.env.BLOOMREACH_DOMAIN_KEY}&url=${process.env.BLOOMREACH_URL}&request_type=search&search_type=keyword&q=${productId}&rows=1&start=0&fl=pid,title,price,description,url,thumb_image,large_image,reviews,sale_price,swatch_image,fab_tech&fq&efq&sort`, { next: { revalidate: 1 } }
        ).then((response) => response.json());

        const pid = bloomreachData?.response?.docs[0]?.pid ? bloomreachData?.response?.docs[0]?.pid : productId

        const hybrisData = await fetch(
            `${process.env.HYBRIS_API_URL}/restv2/v2/b2c-us/products/${pid}?fields=FULL`, { next: { revalidate: 1 } }
        )
            .then((response) => response.json());

        if (!bloomreachData && !hybrisData) {
            return notFound(404);
        }
        return (
            <PDPClient bloomreachData={bloomreachData} hybrisData={hybrisData} />
        );
    } catch (ex) {
        console.log(ex)
        return notFound(404);
    }

}


export async function generateStaticParams() {
    return []
}
