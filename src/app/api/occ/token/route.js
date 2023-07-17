import { NextResponse } from 'next/server'
import { fetchHybrisClientToken } from '@/lib/HybrisMethods'

export async function POST(request) {
    const resp = await fetchHybrisClientToken()
    return NextResponse.json(resp)
}