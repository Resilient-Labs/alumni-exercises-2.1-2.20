// Exercise 2.19 Phonebook - Step 11

import React, {useEffect} from "react"

const Notification = ({message, type, setMessage, setType}) => {
  
    useEffect(() => {
      if (message) {
          const timer = setTimeout(() => {
              setMessage(null);
              setType('');
          }, 5000);
          return () => clearTimeout(timer);
      }

  }, [message]);

  return (
      message ?
      <div className={type}>
          {message}
      </div>
      :
      null
  );
};

export default Notification;
