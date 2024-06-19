import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: '',
    required: false,
    description: '_id of the employee',
  })
  @IsOptional()
  @IsString()
  _id: string;

  @ApiProperty({
    example: 'test@www.de',
    required: true,
    description: 'email of the employee',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
    required: false,
    description: 'firstName of the employee',
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    required: false,
    description: 'lastName of the employee',
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'Manager',
    required: false,
    description: 'jobTitle of the employee',
  })
  @IsOptional()
  @IsString()
  jobTitle: string;

  @ApiProperty({
    example: 'Sales',
    required: false,
    description: 'department of the employee',
  })
  @IsOptional()
  @IsString()
  department: string;
}
