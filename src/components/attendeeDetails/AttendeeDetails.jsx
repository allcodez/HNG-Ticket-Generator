import React, { useContext, useState, useRef } from "react";
import { FormContext } from "../../context/FormContext";
import "./attendeeDetails.css";
import cloudIcon from "../../assets/images/cloud-download.png";

const AttendeeDetails = () => {
    const { formData, setFormData, nextStep, prevStep } = useContext(FormContext);
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.avatar) {
            newErrors.avatar = "Please upload an image.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateForm()) {
            setTimeout(() => {
                nextStep();
            }, 1500);
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const focusableElements = Array.from(
                document.querySelectorAll("input, textarea, button")
            );

            const currentIndex = focusableElements.indexOf(event.target);

            if (currentIndex !== -1 && focusableElements[currentIndex + 1]) {
                focusableElements[currentIndex + 1].focus();
            } else {
                handleNext(); // If no next field, proceed to next step
            }
        }
    };



    const handleImageUpload = async (file) => {
        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            setErrors({ ...errors, avatar: "Only PNG, JPG, and GIF images are allowed." });
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dzmb0xyea/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
                setErrors((prev) => ({ ...prev, avatar: null }));
            } else {
                setErrors((prev) => ({ ...prev, avatar: "Image upload failed. Try again." }));
            }
        } catch (error) {
            setErrors((prev) => ({ ...prev, avatar: "Error uploading image. Try again." }));
        }

        setUploading(false);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    return (
        <>
            <div className="form-header">
                <h2>Attendee Details</h2>
                <p>Step 2/3</p>
            </div>

            <div className="progress-bar">
                <div style={{ width: "55%" }}></div>
                <div style={{ width: "45%" }}></div>
            </div>

            <div className="form-body">
                <div className="upload-image">
                    <p>Upload Profile Photo *</p>
                    <div
                        className={`upload-box ${dragging ? "dragging" : ""}`}
                        tabIndex="0"
                        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            hidden
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            className={`upload-inner-box ${formData.avatar ? "image-uploaded" : ""}`}
                            style={{
                                backgroundImage: formData.avatar ? `url(${formData.avatar})` : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="no-image">
                                <img src={cloudIcon} alt="Upload icon" width={30} />
                                <p>Drag & drop or click to upload</p>
                            </div>
                            {!formData.avatar && (
                                <>
                                    <img src={cloudIcon} alt="Upload icon" width={30} />
                                    <p>{uploading ? "Uploading..." : "Drag & drop or click to upload"}</p>
                                </>
                            )}
                        </label>
                    </div>
                    {errors.avatar && <p className="error-message">{errors.avatar}</p>}
                </div>

                <hr />

                <div className="attendee-details">
                    <p>Enter your name *</p>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="attendee-details">
                    <p>Enter your email *</p>
                    <input
                        type="email"
                        placeholder="✉️ hello@avioflagos.io"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onKeyDown={handleKeyDown}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="attendee-details">
                    <p>Special request?</p>
                    <textarea
                        placeholder="Special request?"
                        value={formData.specialRequest || ""}
                        onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                        rows={5}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="form-btn">
                    <button
                        className="cancel-btn"
                        tabIndex="0"
                        onClick={prevStep}
                        onKeyDown={(e) => e.key === "Enter" && prevStep()}
                    >
                        Back
                    </button>

                    <button
                        className="next-btn"
                        tabIndex="0"
                        onClick={handleNext}
                        onKeyDown={handleKeyDown}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default AttendeeDetails;
