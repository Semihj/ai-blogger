import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <div className='flex items-center p-4 md:hidden w-full ' >
        <div className="flex w-full justify-end">
          <UserButton />
        </div>
    </div>
  )
}
