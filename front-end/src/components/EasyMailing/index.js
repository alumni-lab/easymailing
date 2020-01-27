import React from 'react';
import './index.css';

export default function EasyMailing() {
  return (
    <div>
    <form className='flex-container'>
      <input placeholder="Email Address" type="email" name="email" className='email'>
      </input>
      <input placeholder="Subject" type="text" name="subject" className='subject'>
      </input>
      <textarea placeholder="Type your message here" name="message" className="message">
      </textarea>
      <button type="submit" className='submit'>
        Send Message
      </button>

    </form>
    </div>
  );
}