import React, { useEffect, useState } from "react";
import Form from "../Components/Form";
import "../Dashboard.css";

const PassengerDetailsCard = ({
  name,
  email,
  seatId,
  date,
  onHandleEdit,
  onHandleDelete,
}) => {
  return (
    <div className="passenger-card">
      <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Seat No: {seatId}</p>
        <p>Date: {date}</p>
      </div>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => onHandleEdit(seatId)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onHandleDelete(seatId)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [passengersList, setPassengersList] = useState();
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState();

  const getPassengersList = () => {
    try {
      const details = JSON.parse(localStorage.getItem("bookingDetails"));
      setPassengersList(details);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getPassengersList();
  }, []);

  const onHandleEdit = (seatId) => {
    setSelectedSeat(seatId);
    setIsFormOpen(true);
  };

  const onHandleDelete = (seatId) => {
    let updatedPassengersList = { ...passengersList };
    delete updatedPassengersList[seatId];
    localStorage.setItem(
      "bookingDetails",
      JSON.stringify(updatedPassengersList)
    );
    getPassengersList();
    alert("Booking deleted ");
  };

  if (error) return <div>{error}</div>;

  if (!passengersList || !Object.keys(passengersList).length)
    return <div>No bookings yet</div>;

  return (
    <div>
      {passengersList &&
        Object.keys(passengersList)?.map((passengerId) => {
          const passenger = passengersList[passengerId];
          console.log("passenger:- ", passenger);
          return (
            <PassengerDetailsCard
              key={passenger.seatId}
              name={`${passenger.firstName} ${passenger.lastName}`}
              email={passenger.email}
              seatId={passenger.seatId}
              date={passenger.date}
              onHandleEdit={onHandleEdit}
              onHandleDelete={onHandleDelete}
            />
          );
        })}
      {isFormOpen ? (
        <Form
          selectedSeat={selectedSeat}
          setIsFormOpen={setIsFormOpen}
          refetchPassengersList={getPassengersList}
          bookedSeatDetails={passengersList[selectedSeat]}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
