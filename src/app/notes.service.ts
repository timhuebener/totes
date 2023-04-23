import { Injectable } from '@angular/core';
import { RecordListQueryParams, RecordSubscription } from 'pocketbase';
import { pb } from './pocketbase';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public async get(
    offset: number,
    to: number,
    queryParams?: RecordListQueryParams | undefined
  ) {
    return pb.collection('notes').getList(offset, to, queryParams);
  }

  public async create(title?: string, body?: string, file?: File) {
    const date = new Date();
    const formData = new FormData();
    if (title!) formData.append('title', title);
    if (body!) formData.append('body', body);
    if (file!) formData.append('attachment', file);
    formData.append('author', pb.authStore.model?.id!);
    formData.append('lastViewed', date.toISOString());

    console.log(formData.get('attachment'));

    return await pb.collection('notes').create(formData);
  }

  public async delete(id: string) {
    return await pb.collection('notes').delete(id);
  }

  public async subscribe(handler: (data: RecordSubscription) => void) {
    return pb.collection('notes').subscribe('*', handler);
  }
}
