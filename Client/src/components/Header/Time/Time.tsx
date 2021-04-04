import React, { useContext, useState } from "react";

import { Context } from "./../../../context";

export default function Time() {
  const ctx = useContext(Context);
  return <>[{ctx.alive} sec]</>;
}
