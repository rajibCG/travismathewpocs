"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PDPColorList({ option, selected }) {
    const { code, url, variantOptionQualifiers } = option;
    const colorName = variantOptionQualifiers[0]?.name
    const imageUrl = variantOptionQualifiers[0]?.image.url
    const bloomreachUrl = process.env.NEXT_PUBLIC_APP_BLOOMREACH_URL;

    return (
        <li className="col-span-1 pdp-product-details-w2">
            <Link href={url} data-code={code} className=" py-2 px-4 rounded-l" disabled={selected === code}>
                <Image src={bloomreachUrl + imageUrl} width="50" height="25" alt={colorName + ' option'} />
            </Link>
        </li>
    );
}

export default PDPColorList;