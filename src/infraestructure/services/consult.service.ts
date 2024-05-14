import { DepartmentEnum } from 'src/domain/enums/detran.enum';
import { DetranInterface } from 'src/domain/interface/detran.interface';
import { DetranPBService } from './detran-pb.service';
import { DepartmentNotFoundError } from '../exceptions/department.exceptions';

export class ConsultService {
    public async consultCar(
        license_plate: string,
        renavan: string,
        department: DepartmentEnum,
    ) {
        const departmentService = this._getDepartment(department);
        const traficFines = await departmentService.consultCar(
            license_plate,
            renavan,
        );
        return traficFines;
    }

    private _getDepartment(department: DepartmentEnum): DetranInterface {
        const allDepartments = {
            [DepartmentEnum.DETRAN_PB]: new DetranPBService(),
        };

        if (!allDepartments[department]) throw new DepartmentNotFoundError();

        return allDepartments[department];
    }
}
