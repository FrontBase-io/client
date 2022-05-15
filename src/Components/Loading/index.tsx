import styles from "./styles.module.scss";

import { ProgressSpinner } from "primereact/progressspinner";

const Loading: React.FC = () => {
  // Vars

  // Lifecycle

  // UI
  return (
    <div className={styles.center}>
      <ProgressSpinner />
    </div>
  );
};

export default Loading;
