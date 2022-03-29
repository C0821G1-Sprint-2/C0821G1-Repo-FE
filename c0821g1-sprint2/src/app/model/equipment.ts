import {EquipmentType} from './equipment-type';
import {Supplier} from './supplier';
import {Descriptions} from './descriptions';
import {Introduce} from './introduce';
import {TechnicalInformation} from './technical-information';
import {Certifications} from './certifications';

export interface Equipment {
  id?: number;
  code?: string;
  name?: string;
  price?: string;
  expired?: string;
  status?: string;
  deleteFlag?: boolean;
  image?: string;
  equipmentType: EquipmentType;
  supplier: Supplier;
  description: Descriptions;
  introduce: Introduce;
  technical_information: TechnicalInformation;
  certifications: Certifications;
}
