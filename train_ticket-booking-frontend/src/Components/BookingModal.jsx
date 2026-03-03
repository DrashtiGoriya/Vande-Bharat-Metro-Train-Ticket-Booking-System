import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Armchair } from "lucide-react";
import generateSeats from "../Helper/generateSeat";

const BookingModal = ({ event, isOpen, onClose, onConfirm }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (!event) return;

    const generated = generateSeats(event.capacity || 0);
    const bookedSeats = (event.allSeats || []).flat();

    const finalSeats = generated.map
    ((s) =>bookedSeats.includes(s.number) ? { ...s, isBooked: true } : s);

    setSeats(finalSeats); }, [event]);

  if (!isOpen || !event) return null;

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seat.number)
        ? prev.filter((num) => num !== seat.number)
        : [...prev, seat.number]); };

  const pricePerTicket = event.price;
  const total = (selectedSeats.length * pricePerTicket).toFixed(2);

  const groupedSeats = seats.reduce((group, seat) => {
    const row = seat.number.charAt(0);
    if (!group[row]) group[row] = [];
    group[row].push(seat);
    return group; }, {});

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white w-full max-w-lg p-5 rounded-xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <button
            className="text-gray-600 hover:text-black text-xl"
            onClick={onClose}
          >
      
          </button>
        </div>

        {/* EVENT INFO */}
        <div className="grid grid-cols-2 bg-orange-50 p-3 rounded-lg text-sm gap-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={18} /> {event.date}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={18} /> {event.time}
          </div>
          <div className="flex items-center gap-2 text-gray-700 col-span-2">
            <Users size={18} />
            {event.capacity - (event.allSeats || []).flat().length} seats available
          </div>
        </div>

        {/* TRAIN FRONT */}
        <div className="mt-4">
          <div className="text-center text-blue-800 text-sm mb-1">
            <b>FRONT OF TRAIN</b>
          </div>
          <div className="mx-auto w-2/3 h-2 rounded-full bg-gradient-to-r from-orange-600 via-white-400 to-green-800"></div>
        </div>

        {/* SEAT SELECTION */}
        <div className="mt-6 space-y-6 max-h-[250px] overflow-y-auto pr-2">
          {Object.keys(groupedSeats).map((rowKey) => {
            const rowSeats = groupedSeats[rowKey];

            const seatSize =
              seats.length > 300
                ? "w-7 h-7"
                : seats.length > 150
                ? "w-8 h-8"
                : seats.length > 80
                ? "w-9 h-9"
                : "w-10 h-10";

            return (
              <div
                key={rowKey}
                className="flex justify-center items-center gap-8">
                {/* LEFT SIDE */}
                <div className="flex gap-3">
                  {rowSeats.slice(0, 2).map((seat) => (
                    <div key={seat.number} className="flex flex-col items-center">
                      <button
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.isBooked}
                        className={`
                          ${seatSize}
                          flex items-center justify-center rounded-md border transition
                          ${
                            seat.isBooked
                              ? "bg-blue-900 border-blue-600 cursor-not-allowed"
                              : selectedSeats.includes(seat.number)
                              ? "bg-white border-purple-800 scale-105 shadow-md"
                              : seat.number.charCodeAt(0) % 2 === 0
                              ? "bg-orange-400 border-orange-500"
                              : "bg-green-700 border-green-500"}`}>
                        <Armchair
                          size={16}
                          className={
                            seat.isBooked
                              ? "text-white"
                              : selectedSeats.includes(seat.number)
                              ? "text-purple-900"
                              : "text-gray-800"
                          }
                        />
                      </button>
                      <span className="mt-1 text-[10px] font-medium text-gray-700">
                        {seat.number}
                      </span>
                    </div>
                  ))}
                </div>

                {/* AISLE */}
                <div className="w-10"></div>

                {/* RIGHT SIDE */}
                <div className="flex gap-3">
                  {rowSeats.slice(2, 4).map((seat) => (
                    <div key={seat.number} className="flex flex-col items-center">
                      <button
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.isBooked}
                        className={`
                          ${seatSize}
                          flex items-center justify-center rounded-md border transition
                          ${
                            seat.isBooked
                              ? "bg-blue-900 border-blue-600 cursor-not-allowed"
                              : selectedSeats.includes(seat.number)
                              ? "bg-white border-purple-800 scale-105 shadow-md"
                              : seat.number.charCodeAt(0) % 2 === 0
                              ? "bg-orange-400 border-orange-500"
                              : "bg-green-700 border-green-500"}`}>
                        <Armchair
                          size={16}
                          className={
                            seat.isBooked
                              ? "text-white"
                              : selectedSeats.includes(seat.number)
                              ? "text-purple-900"
                              : "text-gray-800"
                          }
                        />
                      </button>
                      <span className="mt-1 text-[10px] font-medium text-gray-700">
                        {seat.number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* PRICE BOX */}
        <div className="bg-orange-50 border p-3 mt-5 rounded-lg text-sm">
          <div className="flex justify-between text-gray-700">
            <span>Seats:</span>
            <span>{selectedSeats.join(", ") || "Pick your seats first"}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Price:</span>
            <span>₹{pricePerTicket}</span>
          </div>
          <div className="flex justify-between font-bold text-orange-600 text-lg mt-1">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-5">
          <button
            onClick={onClose}
            className="w-[48%] py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold">
            Cancel
          </button>

          <button
            onClick={() => onConfirm({ ...event, total, seats: selectedSeats })}
            disabled={selectedSeats.length === 0}
            className="w-[48%] py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 font-semibold disabled:opacity-40">
            Confirm
          </button>
        </div>
      </div>
    </div>);};

export default BookingModal;
