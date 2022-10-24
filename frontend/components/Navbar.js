import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<nav className="relative w-full z-10 font-OpenSans bg-white border-b-2 border-gray-100">
				<div className="w-full">
					<div className="flex items-center h-20 w-full">
						<div className="flex items-center  mx-20  justify-between w-full">

							<div className="flex justify-center items-center flex-shrink-0 ">
								<Link href={"/"}>
                    <h1 className="text-gray-800 font-bold text-xl cursor-pointer">
                        Web<span className="text-teal-500">App.</span>
                    </h1>
                </Link>
							</div>

							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-8 text-gray-800">
                    <Link href={"/"}>
                        <p className="cursor-pointer relative group md:px-1 font-medium">
                            <span>Articles</span>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                        </p>
                    </Link>
                    <Link href={"/about"}>
                        <p className="cursor-pointer relative group md:px-1 font-medium">
                            <span>About</span>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                        </p>
                    </Link>
                    <Link href={"/"}>
                        <p className="cursor-pointer relative group md:px-1 font-medium">
                            <span>Contact</span>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                        </p>
                    </Link>
                    <Link href={"/"}>
                        <p className="cursor-pointer relative group md:px-1 font-medium">
                            <span>Login</span>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                            <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                        </p>
                    </Link>
                </div>
              </div>
            </div>

            <div className="mr-10 flex md:hidden ">
							<button
								onClick={() => setIsOpen(!isOpen)} type="button"
								className="text-2xl inline-flex items-center justify-center p-2 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-white focus:ring-white"
								aria-controls="mobile-menu" aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{!isOpen ? ( <RiMenu3Line /> ) : ( <RiCloseLine /> )}
							</button>
            </div>

					</div>
				</div>

        <Transition
					show={isOpen}
					enter="transition ease-out duration-100 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-75 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{(ref) => (
						<div className="md:hidden" id="mobile-menu">
							<div ref={ref} className="bg-white px-2 pt-5 pb-5 space-y-4 sm:px-3 border-t-2 border-gray-50" >
                <Link href={"/"}>
                    <p className="cursor-pointer relative group font-medium mx-10 p-1">
                        <span>Articles</span>
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                    </p>
                </Link>
                <Link href={"/about"}>
                    <p className="cursor-pointer relative group font-medium mx-10 p-1">
                        <span>About</span>
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                    </p>
                </Link>
                <Link href={"/"}>
                    <p className="cursor-pointer relative group font-medium mx-10 p-1">
                        <span>Contact</span>
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                    </p>
                </Link>
                <Link href={"/"}>
                    <p className="cursor-pointer relative group font-medium mx-10 p-1">
                        <span>Login</span>
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tr-xl rounded-br-xl"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-gray-700 group-hover:w-1/2 group-hover:transition-all rounded-tl-xl rounded-bl-xl"></span>
                    </p>
                </Link>
							</div>
						</div>
					)}
				</Transition>
                
			</nav>
		</div>
	);
}