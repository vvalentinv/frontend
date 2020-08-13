import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http:HttpClient) { }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
  getAllSections() {
    return this.request('GET', `${environment.serverUrl}/section`);
  }
  getSection(id:number){
    return this.request('GET',`${environment.serverUrl}/section/${id}`);
  }
  addSection(section){
    return this.request('POST',`${environment.serverUrl}/section`,section);
  }
  updateSection(section) {
    return this.request('PUT', `${environment.serverUrl}/section/${section.sectionID}`, section);
  }
}


