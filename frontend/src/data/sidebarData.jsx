import { IoHome } from "react-icons/io5";
import { FiSearch, FiCompass, FiSend, FiPlus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

let user = JSON.parse( localStorage.getItem( 'user' ) )



export const sidebarData = [
    {
        id: 1,
        title: "Welcome",
        icon: <IoHome />,
        link: '/'
    },
    {
        id: 2,
        title: "Research",
        icon: <FiSearch />,
        link: '/research'

    },
    {
        id: 3,
        title: "Discover",
        icon: <FiCompass />,
        link: '/discover'

    },
    {
        id: 4,
        title: "Reels",
        icon: <MdOutlineSlowMotionVideo />,
        link: '/reels'

    },
    {
        id: 5,
        title: "Messages",
        icon: <FiSend />,
        link: '/messages'

    },
    {
        id: 6,
        title: "Notifications",
        icon: <FaRegHeart />,
        link: '/notifications'

    },
    {
        id: 7,
        title: "Create",
        icon: <FiPlus />,

    },
    {
        id: 8,
        title: user?.fullName,
        icon: (
            <img
                src="https://i.pravatar.cc/40" // replace with real profile image
                alt="Profile"
                className="w-6 h-6 rounded-full"
            />
        ),
        link: `/profile-page/${user?._id}`
    },
    {
        id: 9,
        title: "Plus",
        icon: <RxHamburgerMenu />,


    },
];
