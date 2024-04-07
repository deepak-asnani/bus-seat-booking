import React, { useEffect, useState } from "react";
import "../Styles/SeatingChart.css";
import { Tooltip } from "react-tooltip";
import Form from "./Form";

const Seat = ({
  isBooked,
  isReservedForFemale,
  onSelect,
  seatId,
  isLastSeat,
}) => {
  const seatBackgroundColor = isBooked
    ? isReservedForFemale
      ? "#f5476a"
      : "#ddd"
    : "#fff";

    const seatBorderColor = isReservedForFemale ? "#f5476a" : "#ddd";

  return (
    <div
      data-tooltip-content={`Seat No: ${seatId}`}
      data-tooltip-id="my-tooltip"
      className="seat"
      id={seatId}
      style={{
        width: isLastSeat ? "30px" : "70px",
        height: isLastSeat ? "70px" : "30px",
        backgroundColor: seatBackgroundColor,
        cursor: isBooked ? "not-allowed" : "pointer",
        ":hover": {
          backgroundColor: "blue",
        },
        border: `1px solid ${seatBorderColor}`,
      }}
      onClick={() => onSelect(seatId)}
    >
      <div className="seat-head"></div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

const GetSeats = ({
  seatsClassName,
  deckType,
  incrementBy,
  numberOfSeats,
  handleSeatSelection,
  reservedForFemaleIndex,
  bookedSeatsDetails,
}) => {
  return (
    <div className={seatsClassName}>
      {[...Array(numberOfSeats)].map((_, index) => {
        const id = `${deckType === "lower" ? "LW" : "UP"}-${
          numberOfSeats > 1 ? index + incrementBy : 16
        }`;
        const isSeatBooked = bookedSeatsDetails
          ? id in bookedSeatsDetails
          : false;
        return (
          <Seat
            key={id}
            seatId={id}
            isReservedForFemale={index === reservedForFemaleIndex}
            onSelect={handleSeatSelection}
            isBooked={isSeatBooked}
            isLastSeat={numberOfSeats === 1}
          />
        );
      })}
    </div>
  );
};

const SeatingChart = ({ deckType }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState();
  const handleSeatSelection = (seatId) => {
    setSelectedSeat(seatId);
    setIsFormOpen(true);
  };
  const [bookedSeatsDetails, setBookedSeatsDetails] = useState();

  const getPassengersList = () => {
    try {
      const details = JSON.parse(localStorage.getItem("bookingDetails"));
      setBookedSeatsDetails(details);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getPassengersList();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "50px",
        alignItems: "center",
        margin: "auto",
        gap: "5px",
      }}
    >
      <p
        style={{
          alignSelf: "flex-start",
          textTransform: "capitalize",
          color: "grey",
        }}
      >{`${deckType} Deck`}</p>
      <div className="bus">
        <div className="bus-map">
          <div
            className="driver-container"
            style={{
              borderRight: deckType === "lower" ? "1px solid black" : "",
            }}
          >
            <div className="steering-wheel">
              {deckType === "lower" ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1655/1655284.png"
                  alt="driver-steering-wheel"
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="seat-map">
            <div className="double-seats">
              <GetSeats
                seatsClassName="seats"
                incrementBy={1}
                deckType={deckType}
                handleSeatSelection={handleSeatSelection}
                numberOfSeats={5}
                reservedForFemaleIndex={2}
                bookedSeatsDetails={bookedSeatsDetails}
              />
              <GetSeats
                seatsClassName={"seats"}
                numberOfSeats={5}
                deckType={deckType}
                incrementBy={6}
                handleSeatSelection={handleSeatSelection}
                reservedForFemaleIndex={1}
                bookedSeatsDetails={bookedSeatsDetails}
              />
            </div>
            <GetSeats
              seatsClassName={"single-seats"}
              numberOfSeats={5}
              deckType={deckType}
              incrementBy={11}
              handleSeatSelection={handleSeatSelection}
              reservedForFemaleIndex={4}
              bookedSeatsDetails={bookedSeatsDetails}
            />
          </div>
          <GetSeats
            seatsClassName={"last-seat"}
            numberOfSeats={1}
            deckType={deckType}
            incrementBy={0}
            handleSeatSelection={handleSeatSelection}
            bookedSeatsDetails={bookedSeatsDetails}
          />
        </div>
      </div>
      {isFormOpen ? (
        <Form
          selectedSeat={selectedSeat}
          setIsFormOpen={setIsFormOpen}
          refetchPassengersList={getPassengersList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SeatingChart;
