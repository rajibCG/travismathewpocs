import { cookies } from 'next/headers'

async function getData() {
  try {
    const query = await fetch(`https://core.dxpapi.com/api/v1/core/?q=polo&rows=5&start=0&request_type=search&search_type=keyword&fl=badge%2Ccolor%2Ccolor_group%2Cpid%2Cprice%2Cpromotion%2Csale_price%2Csku_color%2Csku_ids%2Csku_price%2Csku_sale_price%2Csku_swatch_images%2Csku_thumb_images%2Cswatch_image%2Cthumb_image%2Ctitle%2Curl&request_id=9915893211589&account_id=6449&url=travismathew.com&domain_key=travismathew`,
      { next: { revalidate: 10 } }
    )
    return await query.json()
  } catch (ex) {
    return {
      response: null
    }
  }

}

function getCookieValue() {
  const cookielist = cookies()
  if (cookielist.has('akug')) {
    return cookielist.get('akug').values
  }
  return 'guest'
}

export default async function Home() {
  const search = getCookieValue()
  const { response } = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {search === 'user' ? response.docs[2].sale_price : response.docs[2].price} {search}
    </main>
  )
}
