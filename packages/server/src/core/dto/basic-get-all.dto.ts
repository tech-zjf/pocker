import { IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}

export enum OrderByEnum {
    CREATE_TIME = 'createTime',
    UPDATE_TIME = 'updateTime',
}

export class BasicGetAllDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    readonly pageSize?: number = 10;

    @IsEnum(OrderByEnum)
    readonly orderBy?: OrderByEnum = OrderByEnum.CREATE_TIME;

    @IsEnum(OrderEnum)
    readonly order?: OrderEnum = OrderEnum.DESC;
}
