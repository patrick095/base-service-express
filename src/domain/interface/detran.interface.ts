import { DepartmentEnum } from '../enums/detran.enum';

export interface DetranInterface {
    consultCar(
        license_plate: string,
        renavan: string,
    ): Promise<DetranTraficFineResponseInterface>;
}

export interface DetranTraficFineResponseInterface {
    totalValue: number;
    traficFines: Array<DetranTraficFineInterface>;
}

export interface DetranTraficFineInterface {
    agency: string;
    date: Date;
    value: number;
    description: string;
}

export interface ConsultCarDataInterface {
    license_plate: string;
    renavan: string;
    department: DepartmentEnum;
}
