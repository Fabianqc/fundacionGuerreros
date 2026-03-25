import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class WeeklyDayDto {
    @IsString()
    day: string;

    @IsNumber()
    dayIndex: number;

    @IsBoolean()
    isActive: boolean;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;
}

class BiweeklyDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WeeklyDayDto)
    week1: WeeklyDayDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WeeklyDayDto)
    week2: WeeklyDayDto[];
}

class MonthlyDayDto {
    @IsNumber()
    day: number;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;
}

class MonthlyDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MonthlyDayDto)
    days: MonthlyDayDto[];
}

class SpecificDayDto {
    @IsString()
    id: string;

    @IsString()
    date: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;
}

export class CreateDoctorHorarioDto {
    @IsString()
    type: 'weekly' | 'biweekly' | 'monthly' | 'specific';

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => WeeklyDayDto)
    weekly?: WeeklyDayDto[];

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => BiweeklyDto)
    biweekly?: BiweeklyDto;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => MonthlyDto)
    monthly?: MonthlyDto;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => SpecificDayDto)
    specific?: SpecificDayDto[];
}
