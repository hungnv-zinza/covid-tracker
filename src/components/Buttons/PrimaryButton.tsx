import { HTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'blue',
    color: 'white'
  }
}));

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const PrimaryButton = ({ className, ...props }: Props) => {
  const classes = useStyles();

  return <button className={clsx(classes.root, className)} {...props} />;
};

export default PrimaryButton;
