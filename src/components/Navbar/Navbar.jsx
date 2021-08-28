import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.mainContainer}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#7f53ac",
          backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            <div className={styles.navigation}>Analysis Of variance</div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
