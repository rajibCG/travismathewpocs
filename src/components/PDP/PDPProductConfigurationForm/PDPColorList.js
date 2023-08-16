"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function PDPColorList({ option, selected, sizeOption }) {
    const route = useRouter()
    const { code, url, variantOptionQualifiers } = option;
    const colorName = variantOptionQualifiers[0]?.name
    const imageUrl = variantOptionQualifiers[0]?.image.url
    const bloomreachUrl = process.env.NEXT_PUBLIC_APP_BLOOMREACH_URL;

    const handleColorRoute = () => {
        route.push(url + sizeOption)
    }
    return (
        <li className="col-span-1 pdp-product-details-w2">
            <div onClick={handleColorRoute} data-code={code} className="cursor-pointer" disabled={selected === code}>
                <Image src={bloomreachUrl + imageUrl} width="50" height="25" alt={colorName + ' option'} />
            </div>
        </li>
    );
}

export default PDPColorList;