import { FC, SyntheticEvent } from 'react'
import { Snackbar, SnackbarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert, { AlertProps } from '@material-ui/lab/Alert'

interface AppSnackbarProps {
  severity: AlertProps['severity']
  autoHideDuration: SnackbarProps['autoHideDuration']
  onClose: () => void
}

const AppSnackbar: FC<AppSnackbarProps> = ({ severity, autoHideDuration, children, onClose }) => {
  const classes = useStyles()

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()
  }

  return (
    <Snackbar open className={classes.root} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert severity={severity}>{children}</Alert>
    </Snackbar>
  )
}

const useStyles = makeStyles({
  root: {
    bottom: 100,
  },
})

export default AppSnackbar
