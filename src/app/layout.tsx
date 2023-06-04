import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/utils/provider'
import TopMenu from '../components/Layout/TopMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokemon',
  description: 'Pokemon exercise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    return <html lang="en">
      <body className={inter.className + ' bg-base-400 min-h-screen'}>
      <Providers>
        <TopMenu />
        <div className="w-full p-4">
          {children}
        </div>
      </Providers>
      </body>
    </html>
}