import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Output() stick = new EventEmitter();
  @Output() hit = new EventEmitter();
  @Output() fact = new EventEmitter();
  @Output() quit = new EventEmitter();
  @Output() again = new EventEmitter();

  public showStickButton = false;
  public showHitButton = false;
  public showFactButton = false;
  public showQuitButton = false;
  public showAgainButton = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    switch (this.route.snapshot.url[0].path) {
      case 'game':
        this.showStickButton = true;
        this.showHitButton = true;
        this.showFactButton = true;
        break;
      case 'end':
        this.showQuitButton = true;
        this.showAgainButton = true;
        break;
    }
  }

  dispatchEvent(event: string): void {
    this[event].emit();
  }
}
