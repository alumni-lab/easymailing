import React from 'react';

export default function EasyMailing() {
  return (
    <form>
      <input placeholder="Email Address" type="email" name="email">
      </input>
      <input placeholder="Subject" type="text" name="subject">
      </input>
      <input placeholder="Message" name="message">
      </input>
      <button type="submit">
        Send Message
      </button>

    </form>
  );
}