import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <h1>My App</h1>
            <Outlet /> {/* 👈 This ensures nested routes render correctly */}
        </div>
    );
};

export default Layout;
