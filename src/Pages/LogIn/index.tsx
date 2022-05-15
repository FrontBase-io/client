import styles from "./styles.module.scss";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useState } from "react";
import Server from "../../Utils/Socket";

const Login: React.FC = () => {
  // User
  const [user, setUser] = useState<{ username?: string; password?: string }>({
    username: "",
    password: "",
  });

  const onSubmit = () => {
    Server.emit("authenticate", user);
    Server.on("receive-token", (token) => {
      localStorage.setItem("token", token);
      window.location.reload();
    });
  };

  return (
    <div className={styles.login}>
      <Card title="Login">
        <div style={{ width: "45vw", height: "50vh" }}>
          <span
            className="p-float-label"
            style={{
              width: "100%",
            }}
          >
            <InputText
              id="in"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="in">Username</label>
          </span>

          <span
            className="p-float-label"
            style={{
              width: "100%",
            }}
          >
            <Password
              id="in"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label htmlFor="in">Password</label>
          </span>

          <Button label="Save" onClick={onSubmit} />
        </div>
      </Card>
    </div>
  );
};

export default Login;
