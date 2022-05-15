import styles from "./styles.module.scss";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useState } from "react";
import Server from "../../Utils/Socket";

const ServerSetup: React.FC = () => {
  // User
  const [user, setUser] = useState<{
    username?: string;
    password?: string;
    passwordConfirmation?: string;
  }>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const onSubmit = () => {
    if (user.password === user.passwordConfirmation) {
      Server.emit("setup-server", {
        user: { username: user.username, password: user.password },
      });
      Server.on("user-created", () => window.location.reload());
    } else {
      alert(`Passwords don't match`);
    }
  };

  return (
    <div className={styles.setup}>
      <Card title="Server set-up">
        <div style={{ width: "45vw", height: "50vh" }}>
          <div className={styles.inputBlock}>
            <span className="p-float-label">
              <InputText
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                style={{
                  width: "100%",
                }}
              />
              <label htmlFor="in">Username</label>
            </span>
          </div>

          <div className={styles.inputBlock}>
            <span className="p-float-label">
              <Password
                toggleMask
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{
                  width: "100%",
                }}
              />
              <label htmlFor="in">Password</label>
            </span>
          </div>

          <div className={styles.inputBlock}>
            <span
              className="p-float-label"
              style={{
                width: "100%",
              }}
            >
              <Password
                toggleMask
                id="password-confirmation"
                value={user.passwordConfirmation}
                style={{
                  width: "100%",
                }}
                onChange={(e) =>
                  setUser({ ...user, passwordConfirmation: e.target.value })
                }
              />
              <label htmlFor="in">Password confirmation</label>
            </span>
          </div>

          <Button label="Save" onClick={onSubmit} />
        </div>
      </Card>
    </div>
  );
};

export default ServerSetup;
