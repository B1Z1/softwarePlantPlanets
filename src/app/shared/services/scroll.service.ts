import { Injectable } from '@angular/core'
import { EventManager } from '@angular/platform-browser'
import { throttle, map, pairwise, filter } from 'rxjs/operators'
import { Subject, Observable, interval } from 'rxjs'

import { Position } from '../interfaces/position.interface'

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private _scrollPercent = 70
  private scrollSubject: Subject<Document> = new Subject()

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'scroll', this.onScroll.bind(this))
  }

  /**
   * @function onScrolledDown
   * @description Activate scroll event. Sets throttle,
   *              map objects and returns scrollheight,
   *              scrolltop and client height. Then filter
   *              them by checks is user scrolling down
   *              and checks percentege of current
   *              position in document
   * @returns {Array}
   */
  get onScrolledDown$(): Observable<[Position, Position]> {
    return this.onScroll$.pipe(
      throttle(() => interval(300)),
      map(doc => {
        return {
          scrollHeight: doc.documentElement.scrollHeight,
          scrollTop: doc.documentElement.scrollTop || doc.body.scrollTop,
          clientHeight: doc.documentElement.clientHeight
        }
      }),
      pairwise(),
      filter(
        positions =>
          this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1], this.scrollPercent)
      )
    )
  }

  get onScroll$(): Observable<Document> {
    return this.scrollSubject.asObservable()
  }

  get scrollPercent() {
    return this._scrollPercent
  }

  set scrollPercent(scrollPercent: number) {
    this._scrollPercent = scrollPercent
  }

  onScroll(event: UIEvent) {
    return this.scrollSubject.next(<Document>event.target)
  }

  isUserScrollingDown(positions: Array<Position>) {
    return positions[0].scrollTop < positions[1].scrollTop
  }

  isScrollExpectedPercent(position: Position, percent: number) {
    return (position.scrollTop + position.clientHeight) / position.scrollHeight > percent / 100
  }
}
