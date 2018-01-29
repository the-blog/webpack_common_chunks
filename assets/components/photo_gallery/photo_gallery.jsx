import { React, ReactDOM } from '@react'
import css from './photo_gallery.css'

class PhotoGallery extends React.Component {
  render () {
    return <div class={css.gallery} id='gallery'>
      <img src='http://s.fotorama.io/1.jpg' />
      <img src='http://s.fotorama.io/2.jpg' />
      <img src='http://s.fotorama.io/3.jpg' />
      <img src='http://s.fotorama.io/4.jpg' />
      <img src='http://s.fotorama.io/5.jpg' />
    </div>
  }
}

ReactDOM.render(<PhotoGallery/>, document.getElementById('photo_gallery'))
