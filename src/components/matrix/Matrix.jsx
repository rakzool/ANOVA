import React, { useState } from "react";

import Result from "../result/Result.jsx";
import styles from "./matrix.module.scss";

const mnth = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let row = [0, 0, 0, 0, 0, 0];
let col = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function Matrix() {
  const [table, setTable] = useState(matrix);
  const [gtmatrix, setGtmatrix] = useState(matrix);
  const [grandtotal, setGrandtotal] = useState(0);
  const [rowtotal, setRowtotal] = useState([row]);
  const [coltotal, setColtotal] = useState([col]);

  const handleSubmit = (matrix) => {
    setTable(matrix);

    let i = 0,
      j = 0;
    let midVal = table[3][6];

    for (i = 0; i < matrix.length; i++) {
      for (j = 0; j < matrix[0].length; j++) {
        matrix[i][j] = matrix[i][j] - midVal;
      }
    }
    setGtmatrix(matrix);

    const rowTotal = matrix.map((row) => {
      return row.reduce((rowtotal, element) => rowtotal + element);
    });

    const new_matrix = matrix[0].map((_, colIndex) =>
      matrix.map((row) => row[colIndex])
    );
    const coltotal = new_matrix.map((col) => {
      return col.reduce((coltotal, element) => coltotal + element);
    });

    const grandTotal = coltotal.reduce((el, total) => el + total);
    setGrandtotal(grandTotal);

    setColtotal(coltotal);
    setRowtotal(rowTotal);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>
        {mnth.map((el, index) => {
          return (
            <span className={styles.months} key={index}>
              {el}
            </span>
          );
        })}
        {matrix.map((el, indexOne) => {
          return (
            <div key={indexOne}>
              <span>
                {matrix[0].map((el, indextwo) => {
                  return (
                    <span key={indextwo}>
                      <input
                        type="text"
                        className={styles.inputField}
                        onChange={(val) => {
                          matrix[indexOne][indextwo] = Number(val.target.value);
                        }}
                      ></input>
                      &nbsp;
                    </span>
                  );
                })}
              </span>
            </div>
          );
        })}
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleSubmit(matrix)}
          >
            Calculate
          </button>
        </div>
        <div className={styles.hidden}>
          <Result
            coltotal={coltotal}
            rowtotal={rowtotal}
            grandTotal={grandtotal}
            gtmatrix={gtmatrix}
          />
        </div>
      </h1>
    </div>
  );
}
