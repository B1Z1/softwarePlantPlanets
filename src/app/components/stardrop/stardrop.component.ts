import { StarParameters } from './../../shared/interfaces/star-parameters.interface'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as THREE from 'three'
import { EventManager } from '@angular/platform-browser'

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
  private starParameters: StarParameters[] = []
  private stars

  constructor(private eventManage: EventManager) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setCameraParameters()
    this.setRendererParameters()
    this.generateStarGeo()
    this.eventManage.addGlobalEventListener('window', 'resize', this.onWindowResize.bind(this))
    this.animate()
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  generateStarGeo() {
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: this.sprite
    })
    for (let i = 0; i < 6000; i++) {
      let star = new THREE.Vector3(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300)
      this.starParameters.push({
        velocity: 0,
        acceleration: 0.02
      })
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
    this.starGeo.vertices.forEach((p, index) => {
      this.starParameters[index].velocity += this.starParameters[index].acceleration
      p.z += this.starParameters[index].velocity

      if (p.z > 200) {
        p.z = -200
        this.starParameters[index].velocity = 0
      }
    })
    this.starGeo.verticesNeedUpdate = true
    this.stars.rotation.z += 0.002
  }
}
