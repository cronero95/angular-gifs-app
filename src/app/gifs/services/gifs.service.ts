import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagHistory: string[] = [];

  constructor() { }

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
  }

}
