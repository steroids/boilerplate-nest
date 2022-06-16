import {
    BooleanField,
    CreateTimeField,
    IntegerField,
    PrimaryKeyField, RelationField,
    StringField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {FileModel} from './FileModel';

export class FileImageModel {
    @PrimaryKeyField()
    id: number;

    @IntegerField()
    fileId: number;

    @StringField()
    fileName: string;

    @IntegerField()
    fileSize: number;

    @StringField()
    fileMimeType: string;

    @StringField()
    folder: string;

    @IntegerField()
    width: number;

    @IntegerField()
    height: number;

    @BooleanField()
    isOriginal: boolean;

    @CreateTimeField()
    createTime: Date;

    @RelationField({
        type: 'ManyToOne',
        relationClass: () => FileModel,
    })
    file: FileModel;
}
