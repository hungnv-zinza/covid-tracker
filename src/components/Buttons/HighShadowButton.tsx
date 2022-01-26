import { HTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    color: '#367BF5',
    boxShadow:
      '0 16px 24px 0 rgba(54, 123, 245, .16), 0 6px 12px 0 rgba(54, 123, 245, .16)',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 100,
    fontSize: 20,
    lineHeight: 1.6
  },
  fullWidth: {
    width: '100%'
  }
}));

interface Props extends HTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const HighShadowButton = ({ className, ...props }: Props) => {
  const classes = useStyles();

  return (
    <button
      className={clsx(classes.root, className, {
        [classes.fullWidth]: props.fullWidth
      })}
      {...props}
    />
  );
};

export default HighShadowButton;
