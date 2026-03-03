import { useState, useEffect } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import BookingModal from "../../Components/BookingModal.jsx";
import getStatus from "../../Helper/getStatus.js";
import { ApiService } from "../../Services/ApiService.js";

const Events = () => {
    const user = JSON.parse(localStorage.getItem("authDetail-tickethub"));
    const id = user.id;

    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const loadEvents = async () => {
        const res = await ApiService.post("/events/list", {});
        let upcomingCount = 0;
        let launchedCount = 0;

        const formattedData = res.data.events.map((event) => {
            const date = new Date(event.date);
            const formatted = date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",});

            const status = getStatus(event.date, event.time);
            if (status === "LIVE") launchedCount++;
            if (status === "UPCOMING") upcomingCount++;

            return { ...event, date: formatted };});

        setEvents(formattedData.slice(0, 3));};

    useEffect(() => {
        loadEvents();}, []);

    const handleBooking = async (data) => {
        const payload = {
            eventId: data.id,
            userId: id,
            price: data.total,
            noOfTickets: data.ticketCount,
            seats: data.seats,};

        const response = await ApiService.post("/tickets/add", payload);
        alert(response?.description);
        loadEvents();
        setOpen(false);};

    return (
        <div className="min-h-screen p-10 bg-gradient-to-b from-orange-500 via-white to-green-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                    const availability =
                        100 -
                        (parseInt(event.bookingCount) / event.capacity) * 100;

                    return (
                        <div
                            key={event.id}
                            className="bg-gradient-to-b from-orange-100 via-white to-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    {event.title}</h3>

                                <p className="text-orange-9800 text-sm mb-5">
                                    {event.description}</p>

                                <div className="space-y-3 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        {event.date}</div>

                                    <div className="flex items-center gap-2">
                                        <Clock size={16} />
                                        {event.time}</div>

                                    <div className="flex items-center gap-2">
                                        <Users size={16} />
                                        {parseInt(event.bookingCount)}/{event.capacity} booked</div></div>

                                <div className="mt-6">
                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                        <span>Availability</span>
                                        <span>{availability.toFixed(0)}%</span></div>

                                    <div className="w-full h-2 rounded-full bg-gray-200">
                                        <div
                                            className="h-2 bg-gradient-to-r from-blue-900 via-orange to-blue-900 rounded-full"
                                            style={{ width: `${availability}%` }}/></div></div></div>

                            <div className="flex items-center justify-between border-t border-blue-50 pt-4 mt-6">
                                <div>
                                    <p className="text-xs text-brown-600">Price</p>
                                    <p className="text-xl font-bold">
                                        ₹{event.price}</p></div>

                                <button
                                    className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm hover:bg-orange-600 transition"
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setOpen(true); }}>Book Now</button>
                            </div></div>);})}

                {open && (
                    <BookingModal
                        event={selectedEvent}
                        isOpen={open}
                        onConfirm={handleBooking}
                        onClose={() => setOpen(false)}/>)}</div></div>);};

export default Events;
