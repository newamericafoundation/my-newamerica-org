// Do not bundle User model.
import {render} from 'react-dom'
import routes from './../../routes/client.jsx'

render(routes, global.document.getElementById('main'))
