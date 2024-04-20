import { Injectable } from '@nestjs/common';
import { Photos } from 'src/database/models/photos';
import { DataSource } from 'typeorm';

@Injectable()
export class PhotoService {

    private readonly photos;

    constructor(dataSource: DataSource) {
        this.photos = dataSource.getRepository(Photos)
    }

    async savePhoto(file: File)
    {

    }

    async getPhoto()
    {

    }

    async deletePhoto()
    {

    }

}
