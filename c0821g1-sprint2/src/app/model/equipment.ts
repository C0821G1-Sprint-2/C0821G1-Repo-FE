import {EquipmentType} from './equipment-type';
import {Introduce} from './introduce';
import {TechnicalInformation} from './technical-information';
import {Description} from './description';
import {Certifications} from './certifications';
import {Supplier} from './supplier';

export interface Equipment {
  id: number;
  code: string;
  name: string;
  price: number;
  expired: string;
  status: string;
  deleteFlag: string;
  image: string;
  equipmentType: EquipmentType;
  introduce: Introduce;
  technicalInformation: TechnicalInformation;
  descriptions: Description;
  certifications: Certifications;
  supplier: Supplier;
}
