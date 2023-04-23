import PocketBase from 'pocketbase';
import { environment } from 'src/env';

export const pb = new PocketBase(environment.BASE_URL);
