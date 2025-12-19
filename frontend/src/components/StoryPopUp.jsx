import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaPlay, FaRegHeart } from "react-icons/fa";
import { HiDotsHorizontal, HiPaperAirplane } from "react-icons/hi";
import { TbSend } from "react-icons/tb";
import { BiSolidVolumeMute } from "react-icons/bi";

const StoryPopup = () => {
    const [hover, setHover] = useState( false );
    return (
        <>
            <div className="min-h-screen relative bg-black/85 z-100 p-4 ">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <img
                        className="object-cover select-none w-10 h-10 hidden md:block"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        alt="logo"
                    />
                </div>

                <IoClose className="absolute md:block hidden top-4 right-4 text-white text-4xl cursor-pointer" />

                <div className="flex justify-center items-center gap-3">
                    <div
                        className={`hidden md:flex lg:w-[30px] min-h-[95vh] rounded-lg text-3xl justify-center items-center `}
                        onMouseEnter={() => setHover( true )}
                        onMouseLeave={() => setHover( false )}
                    >
                        <IoIosArrowDropleftCircle
                            className={`transition-all duration-300 cursor-pointer active:scale-94 ${hover ? "text-white " : "text-[#3D3E3F]"
                                }`}
                        />
                    </div>
                    <div className="bg-white text-white w-[380px]  min-h-[95vh] rounded-lg">
                        <div
                            className=" bg-cover  bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://media.istockphoto.com/id/1457290530/photo/asian-teenager-students-doing-robot-arm-and-robotic-cars-homework-project-in-house-using.jpg?s=612x612&w=0&k=20&c=UqJtQbOTZBu6Yw-JB9jHOxpgOCoB5in1W02JuxYlibY=')",
                                width: "100%",
                                overflow: "hidden",
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="flex flex-col justify-between min-h-[95vh]">
                                <div className="flex justify-between items-center p-5">
                                    <div className="flex justify-start items-center gap-2">
                                        <img
                                            className="w-10 h-10 rounded-full object-cover"
                                            src="https://cdn.vectorstock.com/i/1000v/25/68/businessman-profile-icon-formal-wear-vector-9692568.jpg"
                                            alt=""
                                        />
                                        <h5 className="text-sm  tex-white">Username</h5>
                                        <h5 className="text-sm font-bold text-gray-400">22h</h5>
                                    </div>
                                    <div className="flex justify-end items-center gap-4">
                                        <BiSolidVolumeMute className="cursor-pointer text-xl" />
                                        <FaPlay className="cursor-pointer text-sm" />
                                        <HiDotsHorizontal className="cursor-pointer text-2xl" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center p-5">
                                    <input
                                        type="text"
                                        placeholder="Reply to username..."
                                        className="border w-[75%] text-white rounded-full px-3 py-2 placeholder-white focus:outline-none focus:ring-0 focus:border-white"
                                    />
                                    <label htmlFor=""></label>
                                    <div className="flex justify-end items-center text-2xl gap-4">
                                        <FaRegHeart className="cursor-pointer" />
                                        <TbSend className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`hidden md:flex lg:w-[30px] min-h-[95vh] rounded-lg text-3xl justify-center items-center `}
                        onMouseEnter={() => setHover( true )}
                        onMouseLeave={() => setHover( false )}
                    >
                        <IoIosArrowDroprightCircle
                            className={`transition-all duration-300  cursor-pointer active:scale-94 ${hover ? "text-white " : "text-[#3D3E3F]"
                                }`}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StoryPopup;