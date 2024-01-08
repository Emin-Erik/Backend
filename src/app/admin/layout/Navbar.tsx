import React from "react";
import classNames from "classnames";
import {ThemeSwitcher} from "@/components/ui/theme/ThemeSwitcher";

type Props = {
    onMenuButtonClick(): void;
};
const Navbar = (props: Props) => {
    return (
        <nav
            className={classNames({
                "bg-background text-zinc-500": true, // colors
                "flex items-center": true, // layout
                "w-full fixed z-10 px-4 shadow-sm h-16 mb-1": true, //positioning & styling
            })}
        >
            <div>
                <a href="/">
                    <img className="max-h-12" src="/assets/Axiom_Logo.png" alt="Logo"/>
                </a>
            </div>
            <div className="flex-grow"></div>
            <ThemeSwitcher/>
            <button className="md:hidden" onClick={props.onMenuButtonClick}>
                <p>tets</p>
            </button>
        </nav>
    );
};

export default Navbar;