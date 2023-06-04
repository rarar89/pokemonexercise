'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TopMenu = () => {
    
    const router = useRouter();

    return <div className="navbar bg-base-100">
    <div className="flex-1">
      <Link href="/" className='btn btn-ghost normal-case text-xl'>Pokemon</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><Link href='/team/list' onClick={()=>{
          router.push('/team/list', {forceOptimisticNavigation: true}) //bug workaround: https://github.com/vercel/next.js/issues/49450
        }}>Teams</Link></li>
        <li><Link href="/team/create">Create New</Link></li>
      </ul>
    </div>
  </div>
}

export default TopMenu;