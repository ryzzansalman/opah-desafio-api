import { Module } from '@nestjs/common';
    import { ResponseService } from '../../common/services/http-response.service';
    import { StorageService } from '../../common/services/storage.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { NcmController } from './ncm.controller';
    import { NcmService } from './ncm.service';
    import { Ncm, NcmSchema } from './ncm.model';
    
    

    @Module({
      imports: [
        MongooseModule.forFeature([{ name: Ncm.name, schema: NcmSchema }])],
      controllers: [NcmController],
      providers: [
        NcmService, ResponseService,
        StorageService,
      ],
      exports: [
        ResponseService,
        StorageService,
      ],
    })

    export class NcmModule  {
      
    }