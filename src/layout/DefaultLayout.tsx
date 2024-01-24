import { Children } from "react";
import { Link } from "react-router-dom";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout ({ children }: DefaultLayoutProps) {
    return (
        <>
           <header>
                <nav>
                    <ul>
                        <li>
                            <Link to = "/">home</Link>
                        </li>
                        <li>
                            <Link to = "/signub">signub</Link>
                        </li>
                    </ul>
                </nav>
           </header>
           <main>
            {children}
           </main>
        </>

    )
}