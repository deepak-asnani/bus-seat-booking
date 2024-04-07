import React, { useState } from "react";
import "../Styles/Form.css";

const Form = ({
  selectedSeat,
  setIsFormOpen,
  refetchPassengersList,
  bookedSeatDetails,
}) => {
  const [formData, setFormData] = useState(
    bookedSeatDetails ?? {
      firstName: "",
      lastName: "",
      email: "",
      seatId: selectedSeat,
      date: "",
    }
  );

  console.log("form data:- ", formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formData };

    const seatId = formData.seatId;

    const existingData =
      JSON.parse(localStorage.getItem("bookingDetails")) || {};

    existingData[seatId] = newData;

    localStorage.setItem("bookingDetails", JSON.stringify(existingData));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      seatNo: "",
      date: "",
    });
    refetchPassengersList();
    closeModal();
    alert(bookedSeatDetails ? "Passenger details updated" : "Seat Booked");
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      seatNo: "",
      date: "",
    });
  };

  return (
    <div className="form-overlay">
      <div className="form-content">
        <button className="close" onClick={closeModal}>
          &times;
        </button>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            width: "100%",
          }}
        >
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Seat No:</label>
          <input
            id="seat"
            type="text"
            name="seatNo"
            value={selectedSeat}
            disabled
          />
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
