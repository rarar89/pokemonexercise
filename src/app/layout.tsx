import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/utils/provider'

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
  return (
    
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className='btn btn-ghost normal-case text-xl'>Pokemon</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/team/list">Teams</Link></li>
              <li><Link href="/team/create">Create New</Link></li>
            </ul>
          </div>
        </div>
        <div className="hero bg-base-200">
          <div className="hero-content w-full md:max-w-screen-lg flex-col">
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </Providers>
      </body>
    </html>
  )
}
