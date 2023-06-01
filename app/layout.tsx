import './globals.css'
import { Inter } from 'next/font/google'

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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full md:w-3/5 md:max-w-screen-md flex-col">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
      </body>
    </html>
  )
}
