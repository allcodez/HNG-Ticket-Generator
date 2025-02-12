import React, { useEffect, useRef } from "react";
import "./home.css";
import Transition from "../../components/transition/Transition";
import TicketImg from "../../assets/images/Ticket.png";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Home = () => {
  const homeCopyReveal = useRef();
  const homeImageReveal = useRef();
  const homeTaglineReveal = useRef();

  useEffect(() => {
    homeCopyReveal.current = gsap.timeline({ paused: true }).to("h1", {
      top: "0",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.35,
    });

    homeImageReveal.current = gsap
      .timeline({ paused: true })
      .from(".home-img", {
        y: "1000",
        rotate: -10,
        duration: 1,
        ease: "power3.out",
        delay: 0.75,
      });

    homeTaglineReveal.current = gsap
      .timeline({ paused: true })
      .from(".home-tagline", {
        opacity: 0,
        bottom: "-5%",
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });

    homeCopyReveal.current.play();
    homeImageReveal.current.play();
    homeTaglineReveal.current.play();
  }, []);
  return (
    <section className="home-section">
      <div className="home-img">
        <img src={TicketImg} alt="" />
      </div>
      <div className="home-copy">
        <div className="home-copy-wrapper">
          <h1>HNG</h1>
        </div>
        <div className="home-copy-wrapper">
          <h1>Ticket Generator</h1>
        </div>
      </div>

      <Link to="/Ticket" className="home-tagline">
      <p style={{ marginBottom: "5px" }}>Click here mentor</p>
        <button className="ticket-selection">Ticket Selection</button>
        <p>Stage 2 Frontend Task by Fahd Adebayo</p>
      </Link>
    </section>
  );
};

export default Transition(Home);
