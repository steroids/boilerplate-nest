import BaseEnum from '@steroidsjs/nest/domain/base/BaseEnum';

function exportEnum(enumClass: typeof BaseEnum) {
    const labels = enumClass
        .toArray()
        .map((enumElement: {id: string, label: string}) => ({
            id: enumElement.id,
            label: enumElement.label,
        }));
    return {
        labels,
    };
}

export function exportEnums(enums: typeof BaseEnum[]) {
    const arrayableEnums = enums.filter(type => type.toArray);

    const result: {[key: string]: {labels: any}} = {};
    for (const exportedEnum of arrayableEnums) {
        result[exportedEnum.name] = exportEnum(exportedEnum);
    }
    return result;
}
