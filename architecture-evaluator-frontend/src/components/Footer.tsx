import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-bright-turquoise-400 to-primary-dark text-white py-6 mt-8 shadow-inner">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <span className="text-sm">
          © 2024 ArchEv. All Rights Reserved.
        </span>
                <ul className="flex gap-6">
                    <li>
                        <a href="#" className="hover:underline">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};
export default Footer;