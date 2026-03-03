import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Users,
  X,
  IndianRupee,
} from "lucide-react";
import { ApiService } from "../../Services/ApiService";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 100,
    price: 0,});

  /* LOAD EVENTS */
  const loadEvents = async () => {
    const res = await ApiService.post("/events/list", {
      isAdminEvent: true,
      isEventPage: true,
    });
    setEvents(res.data.events);};

  useEffect(() => {
    loadEvents();}, []);

  /* VALIDATION */
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Event date is required";
    if (!formData.time) newErrors.time = "Event time is required";
    if (formData.capacity <= 0)
      newErrors.capacity = "Capacity must be greater than 0";
    if (formData.price < 0)
      newErrors.price = "Price cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;};

  /* MODAL HANDLERS */
  const openAddModal = () => {
    setEditingEvent(null);
    setErrors({});
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: 100,
      price: 0,});
    setShowModal(true);};

  const openEditModal = (event) => {
    setEditingEvent(event);
    setErrors({});
    setFormData(event);
    setShowModal(true);};

  const handleSave = async () => {
    if (!validateForm()) return;

    if (editingEvent) {
      await ApiService.put(`/events/${editingEvent.id}`, formData);
    } else {
      await ApiService.post("/events", formData);
    }

    setShowModal(false);
    loadEvents();};

  const handleDelete = async (id) => {
    await ApiService.delete(`/events/${id}`);
    loadEvents();};

  const toggleStatus = async (event) => {
    await ApiService.put(`/events/${event.id}`, {
      active: !event.active,});
    loadEvents();};

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-orange-900 font-bold">Manage Trips</h1>
          <p className="text-green-900">Create and manage trips</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full">
          <Plus size={18} /> Add Trip
        </button>
      </div>

      {/* EVENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const progress = (
            (parseInt(event.bookingCount) / event.capacity) *
            100
          ).toFixed(1);

          return (
            <div
              key={event.id}
              className="bg-white p-6 rounded-3xl shadow border">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">{event.title}</h2>
                  <span className="text-xs text-red-500">
                    {event.active ? "active" : "inactive"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Pencil
                    onClick={() => openEditModal(event)}
                    className="cursor-pointer"/>
                  <Trash2
                    onClick={() => handleDelete(event.id)}
                    className="cursor-pointer"/>
                </div>
              </div>

              <p className="mt-2 bg-gradient-to-b from-green-700 to-orange-700 bg-clip-text text-transparent">
                {event.description} </p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-2 bg-orange-100 p-2 rounded-full">
                  <Calendar size={16} />
                  {event.date.split("T")[0]}
                </div>

                <div className="flex items-center gap-2 bg-green-100 p-2 rounded-full">
                  <Clock size={16} />
                  {event.time}
                </div>

                <div className="flex items-center gap-2 bg-green-100 p-2 rounded-full">
                  <Users size={16} />
                  {event.bookingCount} / {event.capacity}
                </div>

                <div className="flex items-center gap-2 bg-orange-100 p-2 rounded-full">
                  <IndianRupee size={16} /> ₹{event.price}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Booking</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-orange-400 via-blue-400 to-green-400"
                    style={{ width: `${progress}%` }}/>
                </div>
              </div>

              <div className="flex justify-between mt-4 items-center">
                <span>Status</span>
                <button
                  onClick={() => toggleStatus(event)}
                  className={`w-12 h-6 rounded-full ${
                    event.active ? "bg-green-900" : "bg-orange-900" }`}>
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform ${
                      event.active ? "translate-x-6" : "" }`}/>
                </button>
              </div>
            </div>);})}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div>
                <h2 className="text-xl font-bold text-orange-900">
                  {editingEvent ? "Edit Trip" : "Add New Trip"}
                </h2>
                <p className="text-sm text-green-800">
                  Fill in trip details below
                </p>
              </div>
              <X className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-5">
              {/* TITLE */}
              <div>
                <label className="text-sm font-semibold">Trip Title</label>
                <input value={formData.title} onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value }) }
                  className="w-full mt-1 p-3 bg-orange-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"/>
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </p>)}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-semibold">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })}
                  className="w-full mt-1 p-3 bg-orange-100 rounded-xl resize-none focus:ring-2 focus:ring-orange-400 outline-none"/>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>)}
              </div>

              {/* DATE & TIME */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Date</label>
                  <input type="date" value={formData.date} onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })}
                    className="w-full mt-1 p-3 bg-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
                </div>

                <div>
                  <label className="text-sm font-semibold">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })}
                    className="w-full mt-1 p-3 bg-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
                </div>
              </div>

              {/* CAPACITY & PRICE */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">
                    Booking Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: e.target.value, })}
                    className="w-full mt-1 p-3 bg-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"/>
                </div>

                <div>
                  <label className="text-sm font-semibold">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })}
                    className="w-full mt-1 p-3 bg-green-100 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                      <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2 bg-green-800 text-white rounded-full hover:bg-green-600" >
          <b>Cancel</b>
        </button>
             <button onClick={handleSave}
                  className="px-6 py-2 bg-orange-800 text-white rounded-full font-bold hover:bg-orange-900 transition-colors">
                  {editingEvent ? "Update Trip" : "Create Trip"}</button>
            </div></div> </div>
      )}
    </div>);};
export default AdminEvents;
