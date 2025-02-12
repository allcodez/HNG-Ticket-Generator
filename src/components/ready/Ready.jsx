import React, { useContext, useRef } from "react";
import html2canvas from "html2canvas";
import { FormContext } from "../../context/FormContext";
import TixSvg from "../../assets/images/bg.svg";
import "./ready.css";

const ReadyStep = () => {
    const { formData } = useContext(FormContext);
    const ticketRef = useRef(null);

    const handleDownload = () => {
        if (!ticketRef.current) return;

        html2canvas(ticketRef.current, {
            scale: 2,
            useCORS: true
        }).then((canvas) => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `ticket-${formData.name || "guest"}.png`;
            link.click();
        });
    };

    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <>
            <div className="form-header">
                <h2>Ready</h2>
                <p>Step 3/3</p>
            </div>

            <div className="progress-bar">
                <div style={{width: "30%"}}></div>
                <div style={{width: "70%"}}></div>
            </div>

            <div className="ticket-confirmation">
                <b className="ticket-confirmation-b">Your Ticket is Booked!</b>
                <p className="ticket-confirmation-p">Check your email for a copy or you can download</p>

                <div className="ticket-main" ref={ticketRef}>
                    <img src={TixSvg} alt="" height={"650px"} />

                    <div className="ticket-content">
                        <div className="ticket-content-info">
                            <h3>Techember Fest ’25</h3>
                            <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                            <p>📅 March 15, 2025 | 7:00 PM</p>
                        </div>

                        <div className="ticket-img">
                            <img src={formData.avatar} alt="" />
                        </div>

                        <div className="ticket-content-user">
                            <div className="user-item">
                                <p>Enter your name</p>
                                <b>{formData.name}</b>
                            </div>
                            <div className="user-item">
                                <p>Enter your email *</p>
                                <b>{formData.email}</b>
                            </div>
                            <div className="user-item">
                                <p>Ticket Type:</p>
                                <p>{formData.ticketType}</p>
                            </div>
                            <div className="user-item">
                                <p>Ticket for :</p>
                                <p>{formData.ticketCount}</p>
                            </div>
                            <div className="user-item user-item-span">
                                <p>Special request?</p>
                                <p>{formData.specialRequest}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className="form-btn">
                <button className="cancel-btn" onClick={handleReset}>Book Another Ticket</button>
                <button className="next-btn" onClick={handleDownload}>Download Ticket</button>
            </div>


        </>
    );
};

export default ReadyStep;
