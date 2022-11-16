import Navbar from "./Navbar";

export default function Layout({children}) {
    return (
        <div className="px-8 md:px-18 lg:px-40">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}