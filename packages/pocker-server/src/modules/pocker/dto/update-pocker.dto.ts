import { PartialType } from '@nestjs/mapped-types';
import { CreatePockerDto } from './create-pocker.dto';

export class UpdatePockerDto extends PartialType(CreatePockerDto) {}
