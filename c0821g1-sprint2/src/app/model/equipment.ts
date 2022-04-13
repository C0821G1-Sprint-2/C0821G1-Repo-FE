import {EquipmentType} from './equipment-type';
import {Supplier} from './supplier';
import {Introduce} from './introduce';
import {TechnicalInformation} from './technical-information';
import {Certifications} from './certifications';
import {Description} from './description';

export interface Equipment {
  id ?: number;
  code ?: string;
  name ?: string;
  price ?: number;
  expired ?: string;
  status ?: string;
  deleteFlag ?: string;
  image ?: string;
  equipmentType ?: EquipmentType;
  introduce ?: Introduce;
  technicalInformation ?: TechnicalInformation;
  descriptions ?: Description;
  certifications ?: Certifications;
  supplier ?: Supplier;
}
