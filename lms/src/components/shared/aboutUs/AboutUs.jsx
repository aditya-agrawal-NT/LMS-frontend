import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-parent">
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Discover more about our platform, mission, and the team behind it.</p>
      </div>
      
      <div className="about-us-content">
        <section className="about-us-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make library management efficient and user-friendly 
            by providing a robust platform for managing books, users, and 
            issuances. We aim to help libraries streamline their operations and 
            offer easy access to users while maintaining a well-organized system.
          </p>
        </section>

        <section className="about-us-team">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=" alt="Team Member 1" />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="https://t4.ftcdn.net/jpg/02/14/74/61/240_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg" alt="Team Member 2" />
              <h3>Aditya Agrawal</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <img src="https://as2.ftcdn.net/v2/jpg/02/97/24/51/1000_F_297245133_gBPfK0h10UM3y7vfoEiBC3ZXt559KZar.jpg" alt="Team Member 3" />
              <h3>Sam Wilson</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </section>

        <section className="about-us-values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Innovation:</strong> We constantly push the boundaries of technology to bring the best solutions to the table.</li>
            <li><strong>Reliability:</strong> We deliver a platform that you can trust, day in and day out.</li>
            <li><strong>User-Centric:</strong> Our focus is on the users, making sure they have a seamless and enjoyable experience.</li>
          </ul>
        </section>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
