import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
		import * as mongoose from 'mongoose';
      
      export type TagDocument = mongoose.HydratedDocument<Tag>;
      
      @Schema({ collection: 'Tag', timestamps: true })
      export class Tag {
        
      @Prop({  })
      tagName: string;
    
      @Prop({  })
      tagImage: any[];
    

        @Prop({})
        createdBy: string;

        @Prop({ required: false })
        ownerId: string;

        @Prop({})
        _deletedAt: number;
      }
      
      export const TagSchema = SchemaFactory.createForClass(Tag);
      