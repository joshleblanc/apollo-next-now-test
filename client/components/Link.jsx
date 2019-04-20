import Link from 'next/link';
import { makeStyles, Link as MuiLink } from '@material-ui/core';

const useStyles = makeStyles({
    link: {
        cursor: 'pointer'
    }
})

export default ({ href, children }) => {
    const classes = useStyles();
    return (
        <Link href={href}>
            <MuiLink component={'a'} color={"secondary"} className={classes.link}>
                {children}
            </MuiLink>
        </Link>
    )
}