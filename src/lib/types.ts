export interface ServerRecordType {
  [key: string]: string | number | string[] | null | boolean;
  id: number;
  maintenance: string[];
  initial_vegetative_growth: string;
  young_leaves_unfolding: string;
  flowers_open: string;
  peak_flowering: string;
  flowering_intensity: number | null;
  ripe_fruits: string;
  senescence: string;
  senescence_intensity: number | null;
  remarks: string;
  peak_flowering_estimation: string;
  no_observation: boolean;
  done: boolean;
  collection: number;
  plant: number;
  order: number;
  editor: number;
}

export interface RecordType extends ServerRecordType {
  timestamp_entry: string;
  timestamp_edit: string;
  plant_name: string;
}

export interface ServerCollectionType {
  id: number;
  date: string;
  creator: number;
  garden: number;
  finished: boolean;
  records: RecordType[];
}

export interface ThinCollectionType extends Omit<ServerCollectionType, 'records'> {
  doy: number;
  creator_username: string;
  subgarden_name: string;
  main_garden_name: string;
  prev_collection: number | null;
}

export interface CollectionType extends ThinCollectionType {
  records: RecordType[];
}

export interface StoredCollectionType extends CollectionType {
  edited: boolean;
  uploaded: boolean;
}

export interface UserType {
  id: number;
  username: string;
  subgarden: number;
}

export interface GardenType {
  id: number;
  name: string;
}

export interface GardensType {
  main_garden: GardenType;
  subgardens: GardenType[];
}
