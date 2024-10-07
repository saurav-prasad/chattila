import React, { useEffect, useState } from 'react'
import User from '../user/User'
import './chats.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/functions/auth'
import { deleteConvos } from '../../redux/functions/convos'
import { removeUserDetail } from '../../redux/functions/userDetails'
import { removeAllUsers } from '../../redux/functions/allUsers'
import AllUsers from '../allUsers/AllUsers'
import { UserRoundPlus } from 'lucide-react'
import { Slide } from 'react-awesome-reveal'

function Chats() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authSlice)
    const [chatUsers, setChatUsers] = useState([])
    const userDetails = useSelector(state => state.allUsersSlice)
    const convos = useSelector(state => state.convosSlice)
    const [toggleOpen, setToggleOpen] = useState(false)
    const params = useParams()
    const windowWidth = window.innerWidth

    const toggle = (e) => {
        setToggleOpen(!toggleOpen)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setTimeout(() => {
            dispatch(logout())
            dispatch(deleteConvos())
            dispatch(removeUserDetail())
            dispatch(removeAllUsers())
            navigate('/login')
            localStorage.removeItem('token')
        }, 200);
    }

    useEffect(() => {
        // console.log(convos);
        const infos = userDetails?.filter(e => convos?.peoples?.includes(e.id))
        setChatUsers([...infos])
    }, [userDetails, convos])

    return (
        <>
            <div className={`h-full ${(params.userid && windowWidth <= 768) ? 'hidden' : 'block'}`}>
                <div className='h-[6%] px-2 pt-2 pb-1 flex justify-between items-center space-x-2 border-red-400 border-b'>
                    <div className='flex items-center space-x-1'>
                        <img src={user?.profilePhoto} className='h-10 w-10 rounded-full' alt="" />
                        <h2 className='sm:text-xl text-lg text-white'>{user?.username}</h2>
                    </div>
                    {/* <button onClick={onSubmit}>Logout</button> */}
                    <div className='flex items-center space-x-2'>
                        <UserRoundPlus onClick={() => setToggleOpen(!toggleOpen)} className='text-white cursor-pointer' />
                        <button
                            onClick={onSubmit}
                            type="button"
                            className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className='md:flex-[1] w-full chatbox space-y-2 border-r-2 border-[#222222] shadow-2xl shadow-[#222222] overflow-y-auto h-[94%] bg-[#2c2c2c] px-2 pt-2'>
                    {
                        chatUsers?.map((data, i) =>
                            (data?.id !== user?.id) &&
                            <Slide damping={0.1} direction='up' duration={300} triggerOnce={true} cascade>
                                < User userId={data?.id} image={data.profilePhoto} name={data.username} lastMessage="tum kya karti" key={i} />
                            </Slide>
                        )
                    }
                </div>
            </div>
            {
                toggleOpen && <AllUsers toggle={toggle} />
            }
        </>
    )
}

export default Chats