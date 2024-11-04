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
import AiChat from '../aiChat/AiChat'

function Chats() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authSlice)
    const [chatUsers, setChatUsers] = useState([])
    const userDetails = useSelector(state => state.allUsersSlice)
    const convos = useSelector(state => state.convosSlice)
    const [toggleOpen, setToggleOpen] = useState(false)
    const [aiToggleOpen, setAiToggleOpen] = useState(false)
    const params = useParams()
    const windowWidth = window.innerWidth

    const toggle = (e) => {
        setToggleOpen(!toggleOpen)
    }
    const aiToggle = (e) => {
        setAiToggleOpen(!aiToggleOpen)
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
            <div className={`h-full bg-[#be7e50] md:border-r-2 border-[#222222] shadow-2xl shadow-[#222222] ${(params.userid && windowWidth <= 768) ? 'hidden' : 'block'}`}>
                {/* bg-[#8ABFA3] */}
                <div className='md:h-[11vh] h-[13vh] px-2 py-1 flex flex-col justify-center items-start space-y-2 bg-[#2c2c2c] '>
                    <div className='flex justify-between items-center space-x-2'>
                        {/* border-red-400 border-b */}
                        <div className='flex items-center space-x-1 pr-1'>
                            <img src={user?.profilePhoto} className='h-10 w-10 rounded-full' alt="" />
                            <h2 className='sm:text-xl text-lg text-white'>{user?.username}</h2>
                        </div>
                        {/* <button onClick={onSubmit}>Logout</button> */}
                        {/* <div className='flex items-center space-x-2'> */}
                        {/* <UserRoundPlus onClick={() => setToggleOpen(!toggleOpen)} className='text-white cursor-pointer' /> */}
                        <button
                            onClick={onSubmit}
                            type="button"
                            className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Logout
                        </button>
                        {/* </div> */}
                    </div>
                    <div className='flex justify-around items-center w-full'>

                        {/* Ai */}
                        <div onClick={() => setAiToggleOpen(!aiToggleOpen)} className='hover:bg-[#f9eccfe7] text-white hover:text-black transition-all flex items-center space-x-2 py-1 px-3 border rounded-full select-none cursor-pointer border-[#84beea]'>
                            <h2 className='sm:text-xl text-lg font-semibold'>Ask</h2>
                            <img src="/images/robot2.png" className='h-8 w-8 object-contain rounded-full' alt="" />
                        </div>
                        {/* All users */}
                        <div onClick={() => setToggleOpen(!toggleOpen)} className='hover:bg-[#000000] transition-all flex items-center space-x-2 py-1 px-3 border rounded-full select-none cursor-pointer border-[#84beea]'>
                            <h2 className='sm:text-xl text-lg font-semibold text-white'>Add</h2>
                            <UserRoundPlus className='text-[#66d5f6] cursor-pointer' />
                        </div>

                    </div>

                </div>

                <div className='md:flex-[1] w-full chatbox space-y-2 overflow-y-auto md:h-[89vh] h-[8vh%] bg-[#be7e50] px-2 pt-2'>
                    {/* bg-[#2c2c2c] */}
                    {
                        chatUsers?.map((data, i) =>
                            (data?.id !== user?.id) &&
                            <Slide key={i} damping={0.1} direction='up' duration={300} triggerOnce={true} cascade>
                                < User userId={data?.id} image={data.profilePhoto} name={data.username} lastMessage="tum kya karti" />
                            </Slide>
                        )
                    }
                </div>
            </div>
            {
                toggleOpen && <AllUsers toggle={toggle} />
            }
            {
                aiToggleOpen && <AiChat aiToggle={aiToggle} />
            }
        </>
    )
}

export default Chats