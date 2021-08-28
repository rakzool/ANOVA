import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function Result({ coltotal, rowtotal, grandTotal, gtmatrix }) {
  let assets = {
    correctionFactor: 0,
    ssc: 0,
    ssr: 0,
    sse: 0,
    sst: 0,
  };

  const calculator = (grandTotal) => {
    assets.correctionFactor = grandTotal ** 2 / (12 * 6);
    let ssc = coltotal.map((el) => el * el);
    ssc = ssc.map((el) => el / 6.0);
    ssc =
      ssc.reduce((total, element) => total + element) - assets.correctionFactor;
    assets.ssc = ssc;

    let ssr = rowtotal.map((el) => el * el);
    ssr = ssr.map((el) => el / 12.0);
    ssr =
      ssr.reduce((total, element) => total + element) - assets.correctionFactor;
    assets.ssr = ssr;

    let sst = gtmatrix
      .reduce((a, b) => {
        return a.concat(b);
      })
      .reduce((a, b) => a + b);

    sst = sst - assets.correctionFactor;
    assets.sst = sst;

    const sse = assets.sst - (assets.ssc + assets.ssr);
    assets.sse = sse;
  };

  return (
    <div>
      {calculator(grandTotal)}
      <TableContainer component={Paper}>
        <Table arial-label="data Table">
          <TableHead>
            <TableRow>
              <TableCell>Source of Variation</TableCell>
              <TableCell align="right">Sum Of Square</TableCell>
              <TableCell align="right">Degree of Freedom</TableCell>
              <TableCell align="right">Mean sum Of Square</TableCell>
              <TableCell align="right">Ratio of F</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Between Columns</TableCell>
              <TableCell align="right">SSC : {assets.ssc}</TableCell>
              <TableCell align="right">{gtmatrix[0].length - 1}</TableCell>
              <TableCell align="right">
                {assets.ssc / (gtmatrix[0].length - 1)}
              </TableCell>
              <TableCell align="right">
                {assets.ssc /
                  (gtmatrix[0].length - 1) /
                  (assets.sse /
                    ((gtmatrix.length - 1) * (gtmatrix[0].length - 1)))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Between Rows</TableCell>
              <TableCell align="right">SSR : {assets.ssr}</TableCell>
              <TableCell align="right">{gtmatrix.length - 1}</TableCell>
              <TableCell align="right">
                {assets.ssr / (gtmatrix.length - 1)}
              </TableCell>

              <TableCell align="right">
                {assets.ssr /
                  (gtmatrix.length - 1) /
                  (assets.sse /
                    ((gtmatrix.length - 1) * (gtmatrix[0].length - 1)))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Residual Error</TableCell>
              <TableCell align="right">SSE : {assets.sse}</TableCell>
              <TableCell align="right">
                {(gtmatrix.length - 1) * (gtmatrix[0].length - 1)}
              </TableCell>
              <TableCell align="right">
                {assets.sse /
                  ((gtmatrix.length - 1) * (gtmatrix[0].length - 1))}
              </TableCell>
              <TableCell style={{ background: "#C2F5CC" }}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ background: "#C2F5CC" }}></TableCell>
              <TableCell align="right">SST : {assets.sst}</TableCell>
              <TableCell align="right">
                {gtmatrix.length * gtmatrix[0].length - 1}
              </TableCell>
              <TableCell style={{ background: "#C2F5CC" }}></TableCell>
              <TableCell style={{ background: "#C2F5CC" }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
