import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private giphyApyKey: string = 'UzLDaJHleiZ4O0ZBIyOWhWfjk4gNPNlT';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private searchLimit: string = '10';
  private searchRating: string = 'g';


  constructor(
    private http: HttpClient
  ) { }

  public get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(newTag: string): void {
    newTag = newTag.toLowerCase();

    if(this._tagHistory.includes(newTag)) {
      this._tagHistory = this._tagHistory.filter((tag) => tag !== newTag);
    }

    this._tagHistory.unshift(newTag);

    this._tagHistory = this._tagHistory.splice(0, 10);
  }

  searchTag(newTag: string): void {
    if(newTag === '') return;

    this.organizeHistory(newTag);

    const params = new HttpParams()
      .set('api_key', this.giphyApyKey)
      .set('limit', this.searchLimit)
      .set('rating', this.searchRating)
      .set('q', newTag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList })
      })
  }

}
