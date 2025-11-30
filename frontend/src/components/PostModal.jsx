import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { FiZoomIn } from "react-icons/fi";
import Slider from '@mui/material/Slider';
import ImageFilter from 'react-image-filter';
import { filters } from '../data/filters';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addDaak, getDaak } from '../features/posts/postSlice';
import { IoClose } from 'react-icons/io5';
import { MoonLoader, ScaleLoader } from 'react-spinners'
import { CircularProgress } from 'react-loader-spinner'
const PostModal = ( { showModal, setShowModal } ) => {
    const [imagePreview, setImagePreview] = useState( null )
    const [image, setImage] = useState( null )
    const [zoomIn, setZoomIn] = useState( false )
    const [range, setRange] = useState( 100 )
    const [thirdScreen, setThirdScreen] = useState( false )
    const [editFilter, setEditFilter] = useState( filters.original )
    const [fourthScreen, setFourthScreen] = useState( false )
    const [caption, setCaption] = useState( '' )
    const handleImageChange = ( e ) => {
        let post = e.target.files[0]
        console.log( post )
        let postURL = URL.createObjectURL( post )
        console.log( postURL )
        setImagePreview( postURL )
        setImage( post )
    }

    useEffect( () => {
        console.log( range )
    }, [range] )


    const FilteredImage = React.memo( ( { image, filter, scale } ) => (
        <ImageFilter
            image={image}
            filter={filter}
            style={{ scale }}
            className="aspect-square h-full w-full object-cover"
        />
    ) );

    let [imageLoading, setImageLoading] = useState( false )

    const uploadToCloudinary = async () => {
        setImageLoading( true )
        let data = new FormData()
        data.append( 'file', image )
        data.append( 'upload_preset', 'instagram' );
        let response = await axios.post( 'http://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload', data )
        setImageLoading( false )
        return response.data.url

    }


    const dispatch = useDispatch()
    const { postLoading, postSuccess, postError, postMessage } = useSelector( ( state ) => state.daak )

    const { user } = useSelector( ( state ) => state.auth )

    const handlePostUpload = async () => {
        let url = await uploadToCloudinary()
        console.log( url )
        const myPost = {
            caption,
            image: url,
            filter: editFilter,
            user_id: user?._id
        }

        // useDispatch

        dispatch( addDaak( myPost ) )
        setShowModal( false )
        dispatch( getDaak() )

    }


    return (
        <>
            <div onClick={() => setZoomIn( false )} className={`bg-black/50  justify-center items-center ${showModal ? 'flex' : 'hidden'} min-h-screen fixed top-0 w-full z-50`}>
                <IoClose className='absolute top-5 right-5 text-5xl z-[400] cursor-pointer text-white' onClick={() => setShowModal( false )} />
                <div onClick={( e ) => e.stopPropagation()} className={`bg-white  transition-all duration-300 select-none flex flex-col justify-center items-center py-5 pb-0 ${thirdScreen ? 'xl:w-1/2' : 'xl:w-1/3'} lg:w-1/2 md:w-[80%] w-[90%] relative overflow-hidden rounded-xl gap-4`}>
                    {
                        imagePreview ? (
                            <>
                                <div className="flex w-full px-3 justify-between items-center">
                                    <FaArrowLeft onClick={
                                        thirdScreen ? () => {
                                            setThirdScreen( false )
                                            setEditFilter( filters.original )
                                            setFourthScreen( false )
                                        } : () => setImagePreview( null )
                                    } />
                                    <h2 className="cursor-pointer">Post</h2>
                                    <h2 onClick={thirdScreen ? () => setFourthScreen( true ) : () => setThirdScreen( true )} className="cursor-pointer text-blue-600">
                                        Next
                                    </h2>
                                </div>

                                <div onClick={() => setZoomIn( true )} className={`h-10 w-10 flex justify-center items-center z-[400] rounded-full   absolute bottom-3 left-3 ${zoomIn ? 'bg-white text-black' : 'bg-black/50 text-white'}`}>
                                    <FiZoomIn className='' />
                                    {/* range */}

                                    <div className={`bg-black/70 transition-all duration-300 px-2 py-1 rounded-md absolute translate-x-1/2 ${zoomIn ? '-translate-y-[120%] opacity-100' : 'opacity-0 -translate-y-[70%]'}  w-[100px]`}>
                                        <Slider

                                            size="small"
                                            defaultValue={100}
                                            aria-label="Small"
                                            valueLabelDisplay="auto"
                                            max={200}
                                            min={100}
                                            value={range} onChange={( e ) => setRange( e.target.value )}
                                        />
                                        {/* <input  type="range" name="" id="" /> */}
                                    </div>

                                </div>
                                <div className={`overflow-hidden ${thirdScreen ? 'gap-3' : 'gap-0'} flex w-full h-[400px]`}>

                                    <FilteredImage image={imagePreview} filter={editFilter} scale={range / 100} />

                                    {/* <img style={{
                                        scale: range / 100
                                    }} src={imagePreview} className='aspect-square h-full  w-full  object-cover' alt="" /> */}

                                    <div className={`transition-all ${fourthScreen ? 'scale-0 hidden opacity-0' : 'scale-100 block opacity-100'} duration-400 bg-white ${thirdScreen ? 'w-[60%]' : 'w-0'} `}>
                                        <div className={`grid xl:grid-cols-3 ${thirdScreen ? 'gap-3' : 'gap-0'}  text-center md:grid-cols-2 overflow-y-scroll h-[400px] pb-3`}>
                                            {Object.keys( filters ).map( ( item, index ) => {
                                                return (
                                                    <div onClick={() => setEditFilter( filters[item] )} key={index} className='cursor-pointer'>
                                                        <ImageFilter
                                                            image="https://img.freepik.com/free-vector/flying-hot-air-balloon_23-2147526782.jpg"
                                                            filter={filters[item]}  // ✅ use matrix, not key
                                                            className="w-full"
                                                        />
                                                        <h2 className="text-sm font-semibold">{item}</h2>
                                                    </div>
                                                );
                                            } )}

                                        </div>




                                    </div>


                                    {/* fourth/caption screen */}







                                    <div className={`transition-all ${fourthScreen ? 'scale-100 block opacity-100' : 'scale-0 hidden opacity-0'} duration-400 bg-white ${fourthScreen ? 'w-[60%]' : 'w-0'} `}>
                                        <div className="flex gap-2 items-center mb-3">
                                            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" className='w-[40px] h-[40px] rounded-circle' alt="" />
                                            <h5 className="">Usernmae</h5>
                                        </div>
                                        <textarea value={caption} onChange={( e ) => setCaption( e.target.value )} name="" id="" className='w-[90%] mx-auto border border-t-0 border-e-0 border-s-0 border-gray-300 resize-none outline-0 h-[60%]' placeholder='Enter caption...'></textarea>
                                        <button disabled={imageLoading || postLoading} onClick={handlePostUpload} className="px-4 ms-auto block me-5 mt-5 py-1 bg-black text-white rounded-md">
                                            {imageLoading || postLoading ? (
                                                <CircularProgress
                                                    height="25"
                                                    width="25"
                                                    color="white"
                                                    ariaLabel="circular-progress-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="wrapper-class"
                                                    visible={true}
                                                    strokeWidth={2}
                                                    animationDuration={1}
                                                />
                                            ) : (
                                                'Post'
                                            )}

                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Create a new Post</h3>
                                <div className="w-full h-[2px] bg-gray-200"></div>
                                <img src="https://i.etsystatic.com/34485599/r/il/dee909/5140040715/il_340x270.5140040715_7bjs.jpg" alt="" />
                                <h2>Drag and drop photos and videos here</h2>
                                <input onChange={handleImageChange} type="file" name="post" id="post" className='hidden' />
                                <label htmlFor='post' className="bg-blue-500 mb-10 cursor-pointer hover:bg-blue-600 active:scale-97 px-3 py-2 rounded-md text-white">
                                    Select on the computer
                                </label>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default PostModal