const HASHTAG = process.env.NEXT_PUBLIC_APP_NAME_HASHTAG as string

interface InitParams {
  shareUrl: string
  params: { [k: string]: string }
  isLink?: boolean
}

type ShareType = keyof typeof SHARERS

/**
 * Social Networks element click handler
 */
export const clickHandler = (type: ShareType, title: string, url: string): void => {
  const [shareUrl, isLink] = SHARERS[type](url, title)

  if (isLink) {
    window.location.href = shareUrl
    return
  }

  window.open(shareUrl, '_blank')
}

/**
 * Handler for copying text to the clipboard
 */
export const copyHandler = async (text: string, onEnd: () => void, onError: (err: string) => void): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    onEnd()
  } catch (err) {
    onError(err)
  }
}

/**
 * Social Networks
 */
export const SHARERS: { [k: string]: (u: string, quote: string) => [string, boolean] } = {
  facebook(u: string, quote: string) {
    return prepare({
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
      params: {
        u,
        quote,
        hashtag: HASHTAG,
      },
    })
  },
  twitter(url: string, text: string) {
    return prepare({
      shareUrl: 'https://twitter.com/intent/tweet/',
      params: {
        url,
        text,
        hashtags: HASHTAG,
      },
    })
  },
  telegram(url: string, text: string) {
    return prepare({
      shareUrl: 'tg://msg_url',
      params: {
        url,
        text,
      },
      isLink: true,
    })
  },
  vk(url: string, title: string) {
    return prepare({
      shareUrl: 'http://vk.com/share.php',
      params: {
        url,
        title,
      },
    })
  },
  email(url: string, title: string) {
    return prepare({
      shareUrl: 'mailto:',
      params: {
        subject: HASHTAG,
        body: `Hey! Check out ${title}: ${url}`,
      },
      isLink: true,
    })
  },
  sms(url: string, title: string) {
    return prepare({
      shareUrl: 'sms://',
      params: {
        body: `Hey! Check out ${title}: ${url}`,
      },
      isLink: true,
    })
  },
}

const prepare = ({ shareUrl, params, isLink = false }: InitParams): [string, boolean] => {
  const urlSearchParams = new URLSearchParams('')

  Object.entries(params).forEach(([name, value]) => {
    urlSearchParams.append(name, value)
  })

  return [`${shareUrl}?${urlSearchParams}`, isLink]
}
