import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import Fpeoples from "./FPeople";

const Suggestions = ( { allSuggestions, setAllSuggestion } ) => {
    return (
        <>
            <div className="container  rounded-md mt-9 p-3">
                <div className="flex justify-between  items-center">
                    <div className="flex p-2 gap-2 items-center">
                        <img
                            className="w-[35px] h-[35px] cursor-pointer"
                            src="https://cdn-icons-png.freepik.com/256/10796/10796945.png?semt=ais_white_label"
                            alt=""
                        />
                        <div className="">
                            <div className="flex gap-2 items-center justify-center">
                                <h4 className="font-semibold  text-[14px] cursor-pointer">
                                    Username
                                </h4>
                            </div>
                            <p className="text-sm">User ID</p>
                        </div>
                    </div>
                    {/* <button className="p-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-md duration-100 cursor-pointer">Follow</button> */}
                    <p className="text-blue-700 cursor-pointer">Switch</p>
                </div>

                <div className="flex my-2 justify-between">
                    <h4 className="text-gray-500 font-semibold">Suggested for you</h4>
                    <p
                        onClick={() => setAllSuggestion( true )}
                        className="font-semibold cursor-pointer"
                    >
                        See All
                    </p>
                </div>

                <Fpeoples />
                <Fpeoples />
                <Fpeoples />
                <Fpeoples />
            </div>
        </>
    );
};

export default Suggestions;