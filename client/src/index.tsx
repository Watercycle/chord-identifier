import './general-styles/main'
import App from "./components/App/App"
import { Provider } from "inferno-redux"
import { init } from "@rematch/core"
import * as models from './store'
import {setupMultitouchSupport, disableContextMenuBySelector} from './libs/touch-events'
import registerServiceWorker from './libs/service-worker'
import setupKeyboardShortcuts from './keyboard-shortcuts'
import {initDevTools} from 'inferno-devtools'
import {hydrate} from 'inferno-hydrate'
import {renderToString} from 'inferno-server'

export const store = init({models})

// @ts-ignore - TODO: i think this is a parsing bug?
const app = <Provider store={store} children={<App/>}/>
hydrate(app, document.body)

// isomorphic rendering via prerender-loader
export default () => {
  const html = renderToString(app)
  return html
};

setupMultitouchSupport()
disableContextMenuBySelector('.keyboard')
setupKeyboardShortcuts()
registerServiceWorker()
initDevTools()
