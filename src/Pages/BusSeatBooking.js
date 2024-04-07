import React from "react";
import SeatingChart from "../Components/SeatingChart";

const BusSeatBooking = () => {
  const seatTypes = [
    {
      type: "Reserved For Female",
      seatBorderColor: "#f5476a",
      seatBackgroundColor: "#fff",
    },
    {
      type: "Booked",
      seatBorderColor: "#ddd",
      seatBackgroundColor: "#ddd",
    },
    {
      type: "Booked (Reserved For Female)",
      seatBorderColor: "#f5476a",
      seatBackgroundColor: "#f5476a",
    },
    {
      type: "Available",
      seatBorderColor: "#ddd",
      seatBackgroundColor: "#fff",
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#eeeded",
        display: "flex",
        gap: "1em",
        width: "100%",
        height: "100%",
        padding: "1em",
        justifyContent: "space-around",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" , gap: "2em"}}>
        <p
          style={{
            backgroundColor: "red",
            color: "#fff",
            padding: ".5em",
            width: "70%",
            alignSelf: "center",
          }}
        >
          Click on an Available seat to proceed with your
          transaction
        </p>
        <SeatingChart deckType="lower" />
        <SeatingChart deckType="upper" />
      </div>

      <div style={{ width: "40%" }}>
        {seatTypes.map((seatType) => (
          <div
            style={{
              margin: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "30px",
                backgroundColor: seatType.seatBackgroundColor,
                border: `1px solid ${seatType.seatBorderColor}`,
              }}
            ></div>
            <p style={{ textAlign: "center" }}>{seatType.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSeatBooking;
