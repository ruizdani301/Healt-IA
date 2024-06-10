import { useState } from "react";
import "./ModelPage.css";
import { sendDataPredict } from "../../service/conection";

function ModelPage() {
  // State variables to store the selected values
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior
    // You can handle the form submission logic here
    console.log("Field 1:", field1);
    console.log("Field 2:", field2);
    console.log("Field 3:", field3);
  };
  const objStates = [
    { Hinselmann: field1, Citology: field2, Schiller: field3 },
  ];
  const handlePredict = () => {
    const response = sendDataPredict(objStates);

    if (response.result) {
      setMessage(
        `You are predicted to have a high chance of having cancer, with an accuracy of: ${response.accuracy}`
      );
    } else {
      setMessage(
        `You are predicted to have a low chance of having cancer, with an accuracy of: ${response.accuracy}`
      );
    }
  };

  return (
    <div className="model">
    <div className="model-page">
      <h3 className="title">Model Page</h3>
      <form onSubmit={handleSubmit} className="model-page-form">
        <label className="model-page-label">
          <div className="model-page-title">Hinselmann:</div>

          <select value={field1} onChange={(e) => setField1(e.target.value)}>
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <br />
        <label className="model-page-label">
          <div className="model-page-title">Citology:</div>
          <select value={field2} onChange={(e) => setField2(e.target.value)}>
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <br />
        <label className="model-page-label">
          <div className="model-page-title">Schiller:</div>
          <select value={field3} onChange={(e) => setField3(e.target.value)}>
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <br />
        <div>
          <button
            className="model-page-button"
            type="submit"
            color="primary"
            onClick={() => handlePredict()}
          >
            Get results
          </button>
        </div>
      </form>
      <div className="box-results">
        <p>{message}</p>
      </div>
    </div>
    </div>
  );
}

export default ModelPage;
