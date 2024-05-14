import {
    DetranInterface,
    DetranTraficFineResponseInterface,
} from 'src/domain/interface/detran.interface';

export class DetranPBService implements DetranInterface {
    public consultCar(
        license_plate: string,
        renavan: string,
    ): Promise<DetranTraficFineResponseInterface> {
        //aqui teria toda regra de negócio para consultar um carro no detran PB
        return new Promise((resolve) => {
            resolve({
                totalValue: 0,
                traficFines: [],
            });
        });
    }
}
