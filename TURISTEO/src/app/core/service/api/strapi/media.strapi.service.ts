import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { MediaService } from '../media.service';
import { StrapiUploadResponse } from 'src/app/core/models/strapi';

export class MediaStrapiService extends MediaService{

    constructor(
        private apiSvc:ApiService
    ) { 
        super();
    }

    public upload(blob:Blob):Observable<number[]>{
        const formData = new FormData();
        formData.append('files', blob);
        return this.apiSvc.post('/upload', formData).pipe(map((response:StrapiUploadResponse)=>{
        return response.map(media=>media.id);
        }));
    }
    }