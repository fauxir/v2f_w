"use client";

import { useState } from "react";

function ReportPage() {
  const [number, setNumber] = useState("");
  const [objectData, setObjectData] = useState(null);

  const backEndURL = "https://adf6-92-26-16-202.ngrok-free.app"; // change url here
  const beRepURL = `/api/getObject?number=${number}`;

  const fetchReport = () => {
    // Make the API call to your Python backend
    fetch(backEndURL.concat(beRepURL), {
      method: "GET",
      credentials: "include", // Set credentials to include
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Raw API Response:", data);
        const parsedData = JSON.parse(data); // Attempt to parse the response
        setObjectData(parsedData);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  };

  return (
    <div>
      <h1>Your Report Number</h1>
      <br />
      <input
        type="text"
        placeholder="Enter 10-digit alphanumeric number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={fetchReport} className="ml-5">Find Your Report</button>

      {objectData ? (
        <div>
          <h2>Object Details</h2>
          <pre>{JSON.stringify(objectData, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <br />
          <p>No report found.</p>
        </div>
      )}
    </div>
  );
}

export default ReportPage;
