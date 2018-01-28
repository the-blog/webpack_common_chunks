import './vendors/fotorama.js'
import { React, ReactDOM } from './vendors/React'

class PhotoGallery extends React.Component {
  render () {
    return <div id='gallery'>
      <img src='http://s.fotorama.io/1.jpg' />
      <img src='http://s.fotorama.io/2.jpg' />
      <img src='http://s.fotorama.io/3.jpg' />
      <img src='http://s.fotorama.io/4.jpg' />
      <img src='http://s.fotorama.io/5.jpg' />
    </div>
  }
}

ReactDOM.render(<PhotoGallery/>, document.getElementById('photo_gallery'))
