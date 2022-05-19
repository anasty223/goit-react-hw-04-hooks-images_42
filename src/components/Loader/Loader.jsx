import { css } from "@emotion/react";

import ClockLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export const Loader = () => {
  return (
    <>
      <ClockLoader css={override} size={150} />
    </>
  );
};
