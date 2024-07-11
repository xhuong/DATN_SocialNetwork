import { useState, useCallback } from "react";
import "./styles.css";

const SelectUsername = ({ onUsernameSelected }) => {
  const [username, setUsername] = useState("");

  const isValid = username.length > 2;

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isValid) {
        onUsernameSelected(username, Math.floor(Math.random(1, 100) * 100));
      }
    },
    [isValid, onUsernameSelected, username]
  );

  return (
    <div className="select-username">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username..."
        />
        <button type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SelectUsername;
