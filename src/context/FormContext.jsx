import React, { createContext, useState, useEffect } from "react";

export const FormContext = createContext();

const getSavedData = () => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {
        ticketType: "Regular",
        ticketCount: 1,
        name: "",
        email: "",
        avatar: "",
        specialRequest: "",
        step: 1,
    };
};

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(getSavedData);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const nextStep = () => setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
    const prevStep = () => setFormData((prev) => ({ ...prev, step: prev.step - 1 }));

    return (
        <FormContext.Provider value={{ formData, setFormData, nextStep, prevStep }}>
            {children}
        </FormContext.Provider>
    );
};