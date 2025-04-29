import Loader from '@/components/shared/Loader'
import React from 'react'

const loading = () => {
  return (
<>
 <div className='font-bold text-7xl'>loading</div>
    <div>
        <Loader />
    </div>
</>
  )
}

export default loading