import {KeyboardEvent} from 'react'
import {createStyles, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Twitter, Link, Email, Sms, Facebook, Telegram, ThumbDown} from '@material-ui/icons'
import {clickHandler, copyHandler} from './helper'
import AppBox from 'components/UI/AppBox'

interface ShareMenuProps {
  title: string
  url: string
  onCopyEnd: () => void
  onCopyError: () => void
  onClose: () => void
}

const ShareMenu = ({title, url, onCopyEnd, onCopyError, onClose}: ShareMenuProps): JSX.Element => {
  const classes = useStyles()
  const shareItems = getShareItems()

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) {
      return
    }

    onClose()
  }

  function getShareItems() {
    return [
      {
        text: 'Share to Facebook',
        Icon: Facebook,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: 'Share to Twitter',
        Icon: Twitter,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: 'Share to VK',
        Icon: ThumbDown,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: 'Share to Telegram',
        Icon: Telegram,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: 'Send to Email',
        Icon: Email,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: 'Send to SMS',
        Icon: Sms,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: 'Copy link',
        Icon: Link,
        onClick: () => copyHandler(url, onCopyEnd, onCopyError),
      },
    ]
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <div role="presentation" onKeyDown={onKeyDown} onClick={onClose}>
        <List>
          {shareItems.map(({text, Icon, onClick}) => (
            <ListItem button onClick={onClick} className={classes.listItem} key={text}>
              <AppBox alignItems="center" className={classes.listBox}>
                <ListItemIcon>
                  <Icon color="secondary"/>
                </ListItemIcon>
                <ListItemText primary={text} className={classes.text}/>
              </AppBox>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      height: 65,
    },
    listBox: {
      width: 200,
      margin: '0 auto',
    },
    text: {
      color: theme.palette.text.disabled,
    },
  }),
)

export default ShareMenu
