import { React, Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image}></img>
      <h1>{props.title}</h1>
      <p>{props.address}</p>
    </section>
  );
};

export default MeetupDetail;
