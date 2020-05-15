import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

history.listen(({ action }) => {
  if (['PUSH'].includes(action)) {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    })
  }
})

export { history }
