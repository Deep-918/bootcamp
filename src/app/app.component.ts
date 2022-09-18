import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bootcamp';
  attachPercentDone: any = '';
  dFilePercentDone: any = '';
  constructor(private _httpClient: HttpClient) {}
  ngOnInit(): void {}

  uploadFile(event: any, type: any) {
    if (type === 'eattach') {
      this.attachPercentDone = '0%';
    } else {
      this.dFilePercentDone = '0%';
    }
    // console.log(event.target['files'][0]);
    const formData = new FormData();
    formData.append('file', event.target['files'][0]);
    this._httpClient
      .post('https://file.io', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((response: any) => {
        if (response.type === HttpEventType['UploadProgress']) {
          const percentDone = Math.round(
            (100 * response.loaded) / response.total
          );
          if (type === 'eattach') {
          this.attachPercentDone = percentDone;
          if (this.attachPercentDone === 100) {
            this.attachPercentDone = this.attachPercentDone + '%';
            setTimeout(() => {
              this.attachPercentDone = 'Completed...';
            }, 0);
            setTimeout(() => {
              this.attachPercentDone = '';
            }, 2000);
          } else {
            this.attachPercentDone = this.attachPercentDone + '%';
          }
        } else {
          this.dFilePercentDone = percentDone;
          if (this.dFilePercentDone === 100) {
            this.dFilePercentDone = this.dFilePercentDone + '%';
            setTimeout(() => {
              this.dFilePercentDone = 'Completed...';
            }, 0);
            setTimeout(() => {
              this.dFilePercentDone = '';
            }, 2000);
          } else {
            this.dFilePercentDone = this.dFilePercentDone + '%';
          }
        }
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
  }
}
