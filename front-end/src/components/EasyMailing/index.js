import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

export default function EasyMailing(props) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(email, subject, message);
  }, [email, subject, message]);
  const emailPicker = event => {
    setEmail(event.target.value);
  };

  const subjectPicker = event => {
    setSubject(event.target.value);
  };

  const messagePicker = event => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    axios
      .post(props.baseUrl + props.path, {
        // If key and values have the same name you can skip adding them
        email,
        subject,
        message,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="flex-container">
        <input
          placeholder="Email Address"
          type="email"
          name="email"
          className="email"
          onChange={emailPicker}
          required
        ></input>
        <input
          placeholder="Subject"
          type="text"
          name="subject"
          className="subject"
          onChange={subjectPicker}
          required
        ></input>
        <textarea
          placeholder="Type your message here"
          name="message"
          className="message"
          onChange={messagePicker}
          required
        ></textarea>
        <button type="submit" className="submit" onSubmit={sendMessage}>
          Send Message
        </button>
      </form>
    </div>
  );
}
