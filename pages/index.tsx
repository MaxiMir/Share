import {useState} from "react"
import Share from 'components/Share'
import {Button} from "@material-ui/core"
import AppBox from 'components/UI/AppBox'

export default function Home() {
  const [withShare, setWithShare] = useState(false)

  return (
    <main>
      <AppBox width="100vw" height="100vh" alignItems="center" justifyContent="center">
        <Button variant="outlined" size="small" color="secondary" onClick={() => setWithShare(true)}>Share</Button>
        <Share open={withShare} title="Maxim Minchenko" href="/better/maximir" onClose={() => setWithShare(false)}/>
      </AppBox>
    </main>
  )
}
