import {
    CreateTimeField,
    IntegerField,
    PrimaryKeyField, RelationField,
    StringField,
    UidField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {FileImageModel} from './FileImageModel';

export class FileModel {
    @PrimaryKeyField()
    id: number;

    @UidField()
    uid: string;

    // Original file name
    @StringField()
    title: string;

    // System file name
    @StringField()
    fileName: string;

    @IntegerField()
    fileSize: number;

    @StringField()
    fileMimeType: string;

    @StringField()
    folder: string;

    @CreateTimeField()
    createTime: Date;

    @RelationField({
        type: 'OneToMany',
        relationClass: () => FileImageModel,
        inverseSide: image => image.file,
    })
    images: FileImageModel[];
}
