import { Component, OnInit, OnChanges } from '@angular/core'
import axios from 'axios'
import * as firebase from 'firebase'
const http = axios.create({
  baseURL: 'http://localhost:3000'
})
const config = {
  databaseURL: "https://mango-fire.firebaseio.com",
  projectId: "mango-fire"
}
firebase.initializeApp(config)
const fireSmth = firebase.database().ref('siMangga')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<h1>BLALALA</h1>`,
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Mango Fire App'
  isDead = null
  status = null
  obj = null

  ngOnInit() {
    this.smthCool()
  }
  ngOnChanges () {
    this.smthCool()
  }

  ngDoCheck () {
    this.smthCool()
  }

  smthCool () {
    fireSmth.on('value', (mango) => {
      this.status = mango.val().status
      this.isDead = mango.val().isDead
      this.obj = mango.val().obj
    })
    // this.status = fireSmth['.key'].status
    // this.isDead = fireSmth['.key'].isDead
    // this.obj = fireSmth['.key'].obj
  }

  objectMangga () {
    return JSON.stringify(this.obj)
  }
  
  startGrow() {
    fireSmth.set({ isDead: '', status: '' })
    this.startServer()
  }

  startServer () {
    alert('Start Grow')
    http.get('/start')
    .then(result => {
      alert(JSON.stringify(result))
      console.log('this is result axios ' + result)
    })
    .catch(err => {
      console.log(err)
    })
  }
}


