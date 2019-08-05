import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from '../../services/spinner.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  spinnerColor = 'primary';
  spinnerMode = 'indeterminate';
  spinnerValue = 50;

  constructor(private spinnerService: SpinnerService) { }
  loadingSubscription: Subscription;
  isLoading: boolean;

  ngOnInit() {
    this.loadingSubscription = this.spinnerService.showLoader.subscribe(
      data => this.isLoading = data
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
