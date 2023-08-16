import Footer from '@/components/Sitewide/Footer/Footer'
import Header from '@/components/Sitewide/Header/Header'
import '@/styles/globals.css'
// import { Inter } from 'next/font/google'
import AuthProvider from '../components/Provider/AuthProvider'
import Toaster from '@/components/Notifications/Toaster'
import StoreProvider from '@/reducers/StoreProvider'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Browse polo tops for on or off the course + a full line of men's apparel with superior style. Shop polos &amp; T's for elevated comfort and performance.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
