import React from "react";
import styles from "./MeetupDetails.module.css";

const MeetupDetails = (props) => {
  return (
    <section className={styles.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address> {props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetails;
