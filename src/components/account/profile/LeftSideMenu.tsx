const LeftSideMenu = () => {
  return (
    <aside className='hidden border-r border-[#1e2846] py-4 md:block md:w-1/3 lg:w-1/4'>
      <div className='sticky top-16 flex flex-col gap-2  p-4 text-sm'>
        <h2 className='mb-4 pl-3 text-2xl font-semibold text-white'>
          Settings
        </h2>

        <a
          href='/profile'
          className='rounded-full border border-indigo-600 px-3 py-2.5 text-center font-semibold text-white duration-500 hover:bg-indigo-600'>
          Account Settings
        </a>
      </div>
    </aside>
  )
}

export default LeftSideMenu
