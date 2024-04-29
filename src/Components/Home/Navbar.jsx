import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "../../tailwind.css"
import Logo from "../../Assets/logo1.png"


export default function Navbar() {

    const [isSticky, setIsSticky] = useState(false);

    const navItems = [
        { link: "Overview", path: "home" },
        { link: "Features", path: "feature" },
        { link: "About", path: "about" },
    ]

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (Window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);

        }
    })

    return (
        <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
            <nav className={'bg-white md:px-14 p-1 ${isSticky ? "sticky bg-white duration-300" : ""} max-w-screen-2xl mx-auto text-primary'}>
                <div className="text-lg-container font-medium mx-auto flex justify-between items-center">
                    <div className="flex space-x-14 items-center">
                        <img src={Logo} className="flex justify-center items-center w-[7cm]" />
                        <ul className="md:flex space-x-[3cm]">
                            {
                                navItems.map(({ link, path }) => <a key={link}
                                    href={path} className="block hover:text-gray-300">{link}</a>)
                            }
                        </ul>
                        <div className="space-x-[3cm] hidden md:flex items-center">
                            <button className="active:scale-[.98] active:duration-75 hover:scale[1.01] ease-in-out transition-all py-2 px-3 rounded-xl bg-violet-500 text-white text-lg font-bold mr-"
                                onClick={() => navigate('/login')}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
