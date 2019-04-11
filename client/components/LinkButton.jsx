import React from "react";
import {Button} from '@material-ui/core';
import Link from 'next/link';

export default ({children, href}) => (
  <Link href={href}>
    <Button>{children}</Button>
  </Link>
)