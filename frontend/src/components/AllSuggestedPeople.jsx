import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import Fpeoples from "./Fpeoples";
import { IoClose } from "react-icons/io5";

const AllSuggestedPeople = ( { allSuggestions, setAllSuggestion } ) => {
    return (
        <>
            <div
                className={`bg-black/50 min-h-screen w-full fixed top-0 z-400 ${allSuggestions ? "" : "hidden"
                    }`}
            >
                <div
                    className="
         container w-[50%] mx-auto shadow-lg overflow-x-hidden rounded-md mt-9 p-3 z-100 overflow-y-scroll h-[600px] bg-white"
                >
                    <div className="flex my-2 justify-center">
                        <h4 className="text-gray-500 font-semibold">Suggested for you</h4>
                    </div>

                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                    <Fpeoples />
                </div>
                <IoClose
                    onClick={() => setAllSuggestion( false )}
                    className="z-100 text-white text-4xl fixed top-10 right-10 cursor-pointer"
                />
            </div>
        </>
    );
};

export default AllSuggestedPeople;