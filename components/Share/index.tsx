import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ShareMenu = dynamic(() => import('./ShareMenu'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

interface ShareProps {
  open: boolean
  title: string
  href: string
  onClose: () => void
}

export default function Share({ open, title, href, onClose }: ShareProps): JSX.Element {
  const withNavigatorShare = useRef(false)
  const [withMenu, setWithMenu] = useState(false)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const url = process.env.NEXT_PUBLIC_SERVER_BASE_URL + href

  const onCloseMenu = () => {
    setWithMenu(false)
    onClose()
  }

  useEffect(() => {
    if (!open) {
      withNavigatorShare.current = !!navigator.share
      return
    }

    if (!withNavigatorShare.current) {
      setWithMenu(true)
      return
    }

    navigator.share({ title, url }).catch(onClose)
  }, [onClose, open, title, url])

  return (
    <>
      {withMenu && (
        <ShareMenu
          title={title}
          url={url}
          onCopyEnd={() => setSeverity('success')}
          onCopyError={() => setSeverity('error')}
          onClose={onCloseMenu}
        />
      )}
      {severity && (
        <AppSnackbar severity={severity} autoHideDuration={3000} onClose={() => setSeverity(undefined)}>
          {severity === 'success' ? 'Copied' : 'Something went wrong'}
        </AppSnackbar>
      )}
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
