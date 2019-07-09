import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() confirmMsg: string;
  @Input() declineMsg: string;
  @Output() confirm = new EventEmitter<void>();
  @Output() decline = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onConfirm() { this.confirm.emit(); }

  onDecline() { this.decline.emit(); }
}
