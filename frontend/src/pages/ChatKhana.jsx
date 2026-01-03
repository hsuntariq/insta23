import React, { useRef, useState } from "react";

import { BsSend } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { LuSticker } from "react-icons/lu";
import { SlEmotsmile } from "react-icons/sl";
import { IoMdMic, IoMdSend } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from "../features/users/userSlice";
import { Link } from 'react-router-dom';
import { getMessageData, sendMessageData } from "../features/messages/messageSlice";
import SingleMessage from "../components/SingleMessage";
import io from 'socket.io-client'
import { CiVideoOn } from "react-icons/ci";
import CallingToast from "../components/Calling";

const socket = io.connect( 'http://localhost:5174' )

const Chatkhana = () => {
    const [showMessage, setShowMessage] = useState( false );
    const [search, setSearch] = useState( '' )
    const [searchedUsers, setSearchedUsers] = useState( [] )
    const [clickedUser, setClikedUser] = useState( {} )
    const [message, setMessage] = useState( '' )
    const dispatch = useDispatch()
    const { allUsers, userLoading, userSuccess, userError, user } = useSelector( ( state ) => state.auth )
    const scroll = useRef()

    const { messages, messageLoading, messageSuccess, messageError } = useSelector( ( state ) => state.chats )


    const [sentMessages, setSentMessages] = useState( [] )
    const [receivedMessages, setReceivedMessages] = useState( [] )



    useEffect( () => {
        dispatch( getAllUsers() )
    }, [] )


    useEffect( () => {
        let foundData = allUsers.filter( ( item, index ) => {
            return item.username.toLowerCase().startsWith( search.toLowerCase() )
        } )


        if ( !search ) {
            setSearchedUsers( [] )
        } else {
            setSearchedUsers( foundData )
        }


    }, [search] )






    const handleMessageSend = () => {
        // const messageData = {
        //     message,
        //     sender_id: user?._id,
        //     receiver_id: clickedUser?._id
        // }

        // dispatch( sendMessageData( messageData ) )


        socket.emit( 'sent_message', {
            message,
            sender_id: user?._id,
            receiver_id: clickedUser?._id,
            time: Date.now(),
            sent: true
        } )






    }






    // useEffect( () => {
    //     let interval = setInterval( () => {
    //         dispatch( getMessageData( {
    //             sender_id: user?._id,
    //             receiver_id: clickedUser?._id
    //         } ) )
    //     }, 1000 );


    //     return () => {
    //         clearInterval( interval )
    //     }

    // } )

    useEffect( () => {

        socket.on( 'received_message', ( data ) => {
            alert( data.message )
        } )

    } )


    const handleVideoCall = () => {
        window.open( `http://localhost:5173/video-call/${user?._id}/${clickedUser?._id}`, "_blank" )
        socket.emit( 'calling', {
            caller_id: user?._id,
            receiver_id: clickedUser?._id,
        } )
    }

    const [call, setCall] = useState( false )
    const [callLink, setCallLink] = useState( null )
    useEffect( () => {
        socket.on( 'call_a_rahi_ha', ( data ) => {
            // caller_id,receiver_id
            if ( user?._id == data?.receiver_id ) {
                setCall( true )
            }
        } )


        // declined

        socket.on( 'nahi_uthai', () => {
            alert( 'call declined' )
        } )

        // answered

        socket.on( 'utha_li_ha', ( data ) => {
            setCallLink( data.shareableLink )
        } )


    } )

    const handleDecline = () => {
        setCall( false )
        socket.emit( 'call_declined', {
            caller_id: user?._id,
            receiver_id: clickedUser?._id,
        } )
    }




    const handleAccept = () => {
        window.open( callLink, "_blank" )
    }






    return (
        /*SIDE BAR */
        <>
            {call && <CallingToast
                callerName="John Doe"
                callerNumber="+1 (555) 987-6543"
                callerAvatar="https://randomuser.me/api/portraits/men/32.jpg"
                onAccept={handleAccept}
                onDecline={handleDecline}
            />}

            <div className="h-screen w-full grid grid-cols-1 md:grid-cols-7 overflow-hidden">
                <div className="border-r border-gray-300 p-5 col-span-2 flex flex-col max-md:hidden">
                    <div className="flex justify-between w-full gap-3">
                        <div className="flex gap-1">
                            <h2 className="text-2xl ms-2 font-bold">
                                {user?.username}
                            </h2>
                            <RiArrowDropDownLine className="text-4xl cursor-pointer" />
                        </div>
                        <FaRegEdit className="text-3xl cursor-pointer" />
                    </div>

                    <input
                        value={search}
                        onChange={( e ) => setSearch( e.target.value )}
                        className="w-full p-4 text-lg rounded-[30px] border border-gray-300 my-5"
                        placeholder="Search"
                    />

                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold">Messages</h3>
                        <h4 className="text-gray-500 cursor-pointer font-semibold text-[1.1rem]">
                            Requests
                        </h4>
                    </div>

                    <div className="h-[80vh] overflow-y-scroll pb-20">
                        {searchedUsers?.map( ( item, index ) => {
                            return <div onClick={() => {
                                setClikedUser( item )
                                dispatch( getMessageData( {
                                    sender_id: user?._id,
                                    receiver_id: item._id
                                } ) )
                            }} className="flex flex-col gap-3 mt-3 ">
                                <div
                                    className="hover:bg-gray-100 rounded-xl p-2 cursor-pointer"
                                    onClick={() => setShowMessage( true )}
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                        />
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold">

                                                {item?.username}
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                You: assalam o alaikum • 2d
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } )}
                    </div>
                </div>

                {/* MESSAGE SECTION It includes model 1 and model 2  */}

                <div className="col-span-5 flex flex-col bg-white">
                    {!showMessage ? (
                        // MODEL 1 and it should be visible only when showMessage is false
                        <div className="flex items-center justify-center h-full px-4 text-center">
                            <div className="flex flex-col gap-4 items-center max-w-sm mx-auto">
                                <BsSend className="text-7xl md:text-8xl" />
                                <h1 className="text-2xl font-semibold">Your messages</h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    Send messages to a friend or group.
                                </p>
                                <button className="px-6 py-2 bg-blue-500 text-white cursor-pointer rounded-xl hover:bg-blue-600">
                                    Send message
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Model 2 and it should be visible onlyy when showmessage is true
                        <div className="relative h-screen">
                            <div className="flex items-center justify-between px-4 md:px-9 py-4 border-b border-gray-300">
                                <Link to={`/profile-page/${clickedUser?._id}`} className="flex items-center gap-3">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                        className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                                    />
                                    <div>
                                        <h2 className="font-semibold cursor-pointer text-lg md:text-xl">
                                            {clickedUser?.fullName}
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-base">                                        {clickedUser?.username}
                                        </p>
                                    </div>
                                </Link>
                                <div className="flex gap-2">

                                    <CiVideoOn onClick={handleVideoCall} className="text-4xl cursor-pointer" />
                                    <PiDotsThreeCircleLight className="text-4xl cursor-pointer" />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-scroll  h-[95vh] flex flex-col justify-center items-center text-center px-4 py-30">
                                <img
                                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-4"
                                />

                                <h1 className="text-2xl font-semibold">Username</h1>
                                <p className="text-gray-500">Name</p>

                                <button className="mt-4 px-6 py-2 bg-gray-200 cursor-pointer rounded-xl hover:bg-gray-300 font-semibold">
                                    View Profile
                                </button>


                                {/* messages */}





                                {
                                    messages?.map( ( item, index ) => {
                                        return <SingleMessage {...item} key={index} />
                                    } )
                                }

                                <div ref={scroll} className="h-10"></div>

                            </div>



                            <div className="w-[95%] left-[2.5%] bottom-0 absolute mx-auto mb-4 p-2 cursor-pointer flex items-center gap-4 bg-gray-50 border border-gray-300 rounded-full">
                                <SlEmotsmile className="text-2xl" />

                                <textarea
                                    type="text"
                                    placeholder="Message..."
                                    value={message}
                                    onChange={( e ) => setMessage( e.target.value )}
                                    rows={1}
                                    className="flex-1 resize-none bg-transparent text-lg outline-none px-2"
                                ></textarea>

                                <div className="flex items-center text-2xl gap-4">
                                    {message.length < 1 && <>
                                        <IoMdMic className="cursor-pointer" />
                                        <TbPhotoSquareRounded className="cursor-pointer" />
                                        <LuSticker className="cursor-pointer" />
                                    </>}
                                    {message.length > 0 && <IoMdSend onClick={handleMessageSend} className="cursor-pointer" />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default Chatkhana;