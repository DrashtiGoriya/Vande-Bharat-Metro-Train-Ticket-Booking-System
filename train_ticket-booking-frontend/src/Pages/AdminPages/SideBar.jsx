import { NavLink, useNavigate } from "react-router-dom";
import {  LayoutDashboard,Calendar,LogOut,Tickets,} from "lucide-react";

const SideBar = () => {
  const navigate = useNavigate();
    const menuItems = [
    {name: "Dashboard",icon: LayoutDashboard,path: "/admin/dashboard",active: "bg-orange-50 text-orange-500",hover: "hover:bg-orange-50 hover:text-orange-500",},
    {name: "Bookings",icon: Calendar,path: "/admin/bookings",active: "bg-blue-50 text-blue-500",hover: "hover:bg-blue-50 hover:text-blue-500",},
    {name: "Trips",icon: Tickets,path: "/admin/events",active: "bg-green-50 text-green-500",hover: "hover:bg-green-50 hover:text-green-500",},];

  const handleLogoutConfirm = () => {
    localStorage.removeItem("authDetail-tickethub");
    navigate("/login");};

  return (
    <aside className="w-72 h-screen bg-white flex flex-col shadow-lg">

      {/* Top Section */}
      <div className="p-5 border-b">
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src="/vendebharat-logo.png"
            alt="Vande Bharat Logo"
            className="w-24 object-contain"
          />
          <div>
            <h2 className="text-xl font-semibold text-orange-900">
              Admin Panel
            </h2>
            <p className="text-sm text-green-800">Admin User</p></div></div></div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all
              ${isActive? `${item.active} font-semibold`: `text-gray-600 ${item.hover}`}`}>
            <item.icon size={20} />
            <span>{item.name}</span></NavLink>))}</nav>
{/* Logout */}
      <div className="p-5">
        <button
          onClick={handleLogoutConfirm}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
          <LogOut size={18} /> Logout
        </button></div></aside>);};
export default SideBar;
