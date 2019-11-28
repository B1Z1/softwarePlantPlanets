import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as THREE from 'three'

@Component({
  selector: 'app-stardrop',
  templateUrl: './stardrop.component.html',
  styleUrls: ['./stardrop.component.scss']
})
export class StardropComponent implements OnInit {
  @ViewChild('starDrop', { static: false })
  starDrop: ElementRef

  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  private renderer = new THREE.WebGLRenderer()
  private sprite = new THREE.TextureLoader().load(require('../../../assets/images/sprite.png'))
  private starGeo = new THREE.Geometry()
  private stars

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setCameraParameters()
    this.setRendererParameters()
    this.generateStarGeo()
    this.animate()
  }

  generateStarGeo() {
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: this.sprite
    })
    for (let i = 0; i < 5000; i++) {
      let star = new THREE.Vector3(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300)
      star.velocity = 0
      star.acceleration = 0.02
      this.starGeo.vertices.push(star)
    }
    this.stars = new THREE.Points(this.starGeo, starMaterial)
    this.scene.add(this.stars)
  }

  setRendererParameters() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.starDrop.nativeElement.appendChild(this.renderer.domElement)
  }

  setCameraParameters() {
    this.camera.position.z = 1
    this.camera.position.x = Math.PI / 2
  }

  animate() {
    this.animateStars()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.animate()
    })
  }

  animateStars() {
    this.starGeo.vertices.forEach(p => {
      p.velocity += p.acceleration
      p.z += p.velocity

      if (p.z > 200) {
        p.z = -200
        p.velocity = 0
      }
    })
    this.starGeo.verticesNeedUpdate = true
    this.stars.rotation.z += 0.002
  }
}
