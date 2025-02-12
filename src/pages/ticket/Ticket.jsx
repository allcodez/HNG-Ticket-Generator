import React, { useContext } from "react";
import Transition from "../../components/transition/Transition";
import { FormContext } from "../../context/FormContext";
import TicketSelection from "../../components/ticketSelection/TicketSelection";
import AttendeeDetails from "../../components/attendeeDetails/AttendeeDetails";
import ReadyStep from "../../components/ready/Ready";
import './ticket.css';

const Ticket = () => {
    const { formData } = useContext(FormContext);

    return (
        <div className="form-container">
            <div className="form">
                {formData.step === 1 && <TicketSelection />}
                {formData.step === 2 && <AttendeeDetails />}
                {formData.step === 3 && <ReadyStep />}
            </div>
        </div>
    );
};

export default Transition(Ticket);
