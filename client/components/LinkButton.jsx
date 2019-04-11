import { Button } from '@material-ui/core';
import Link from 'next/Link';

export default ({children, href}) => (
  <Link href={href}>
      <Button>{children}</Button>
  </Link>
)