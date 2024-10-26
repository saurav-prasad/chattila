import React, { useEffect, useState } from 'react'
import User from '../user/User'
import { useSelector } from 'react-redux'

function AllUsers({ toggle }) {
    const [users, setUsers] = useState([])
    const allUsers = useSelector(state => state.allUsersSlice)
    const { user } = useSelector(state => state.authSlice)

    useEffect(() => {
        // console.log(user);
        setUsers([...allUsers])
    }, [allUsers])

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div onClick={() => toggle(false)} className='absolute bg-[#000000c9] sm:bg-[#000000ad] z-[9] top-0 w-full h-full flex justify-center items-center'>
            <div onClick={stopPropagation} className='z-[10] md:w-auto sm:w-[65vw] w-[85vw]'>
                <div className='flex justify-center'>
                    <h1 className='text-white font-semibold text-center text-2xl select-none bg-[#bb6b35e0] px-6 rounded-t-lg'>All Users</h1>
                </div>
                <div className='md:flex-[1] md:min-w-[50vw] w-full chatbox space-y-2 border-r-2 border-[#352011] shadow-2xl shadow-[#222222] overflow-y-auto bg-[#bb6b35e0] px-2 pt-2 sm:h-[55vh] h-[65vh] rounded-md'>
                    {allUsers &&
                        users.map((data, i) =>
                            (user?.id !== data?.id) &&
                            <User userId={data.id} isPopup={true} image={data.profilePhoto} name={data.username} lastMessage="tum kya karti" key={i} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AllUsers