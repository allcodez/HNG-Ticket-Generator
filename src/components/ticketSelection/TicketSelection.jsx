import React, { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import "./ticketSelection.css";

const TicketSelection = () => {
    const { formData, setFormData, nextStep } = useContext(FormContext);

    const handleTicketChange = (type) => {
        setFormData({ ...formData, ticketType: type });
    };

    return (
        <>
            <div className="form-header">
                <h2>Ticket Selection</h2>
                <p>Step 1/3</p>
            </div>

            <div className="progress-bar">
                <div style={{width: "35%"}}></div>
                <div style={{width: "65%"}}></div>
            </div>

            <div className="form-body">
                <div className="event-info">
                    <h3>Techember Fest ’25</h3>
                    <p>Join us for an unforgettable experience at <br /> Techember Fest! Secure your spot now.</p>
                    <div>
                        <p>📍 Lagos, Nigeria</p>
                        <p>| |</p>
                        <p>March 15, 2025 | 7:00 PM</p>
                    </div>
                </div>

                <hr />

                <div className="ticket-type-container">
                    <p>Select Ticket Type:</p>
                    <div className="ticket-type">
                        {["Regular", "VIP", "VVIP"].map((type, index) => (
                            <div
                                key={index}
                                className={`ticket-type-box ${formData.ticketType === type ? "selected" : ""}`}
                                onClick={() => handleTicketChange(type)}
                            >
                                <b>{type === "Regular" ? "FREE" : "$150"}</b>
                                <p className="ticket-type-name">{type} ACCESS</p>
                                <p>20/25</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ticket-amount">
                    <p>Number of Tickets</p>
                    <select
                        value={formData.numberOfTickets}
                        onChange={(e) => setFormData({ ...formData, numberOfTickets: parseInt(e.target.value) })}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-btn">
                    <button className="cancel-btn">Cancel</button>
                    <button className="next-btn" onClick={nextStep}>Next</button>
                </div>
            </div>
        </>
    );
};

export default TicketSelection;
