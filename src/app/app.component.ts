import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
class Post {
  constructor(
    public userId: number,
    public id: string,
    public title: string,
    public body: string
  ) {}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-promises';
  api: string = 'https://jsonplaceholder.typicode.com/posts';
  data = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.api;
      this.http.get<Post[]>(apiURL).subscribe({
        next: (res: any) => {
          this.data = res.map((res: any) => {
            return new Post(res.userId, res.id, res.title, res.body);
          });
          resolve();
          console.log(res);
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }
}
