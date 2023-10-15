import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = 'azione completata con successo!';
  @Input() active = false;

  public ngOnInit(): void {

    
    
  }
  

  toggleActive(){
    this.active = !this.active;
  }
}
