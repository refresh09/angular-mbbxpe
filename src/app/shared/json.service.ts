import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable()
export class JsonService {
  constructor(private http: HttpClient) { }

  getRules() {
    return this.http.get('../assets/rules.json');
  }
}