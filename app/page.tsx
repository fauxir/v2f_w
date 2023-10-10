"use client";

import { useState } from "react";

function ReportPage() {
  const [number, setNumber] = useState("");
  const [objectData, setObjectData] = useState<any>(null);
  const [show, setShow] = useState<number>(0)

  const backEndURL = "https://e677-92-10-228-146.ngrok-free.app"; // change url here
  const beRepURL = `/api/getObject?number=${number}`;

  const fetchReport = () => {
    setShow(0)
    // Make the API call to your Python backend
    fetch(backEndURL.concat(beRepURL), {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("--->", response.url)
        return response.text(); // Read response as text
      })
      .then((responseText) => {
        try {
          const parsedData = responseText; // Attempt to parse the response
          console.log("Parsed API Response:", parsedData);
          setObjectData(parsedData);
        } catch (error) {
          console.log("JSON Parse Error:", error);
        }
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
      });
      setShow(1)
  };
  
console.log("table", JSON.parse(objectData))
  return (
    <div>
      <h1>Your Report Number</h1>
      <br />
      <input
        type="text"
        className="border"
        placeholder="Enter 10-digit alphanumeric number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={fetchReport} className="ml-5 border p-1">Find Your Report</button>

      {objectData ? (
        <div>
          <br />
          <h2>Report number {number}</h2>
          <br />
          {JSON.parse(objectData).map((item: any, index: number) => (
          <tr key={index} className="border-4">
            <th className="border"> Input {index+1}</th>
            <td className="border">{item.Input}</td>
          </tr>
        ))}
        </div>
      ) : (
        show ==1 && <div>
          <br />
          <p>No report found.</p>
        </div>
      )}
    </div>
  );
}

export default ReportPage;
