import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";

import { ManagerEntity } from "./manager.entity";
import { AutoMap } from "@automapper/classes";
import { PlacementEntity } from "./placement.entity";
import { InfluencerEntity } from "./influencer.entity";
import { PlacementType } from "src/infrastructure/enums/placement.type.enum";

@Entity("placement-token")
export class PlacementTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  accessToken: string;

  @Column()
  @AutoMap()
  refreshToken: string;

  @Column({ enum: PlacementType })
  @AutoMap()
  type: PlacementType;

  @ManyToOne(() => InfluencerEntity, { onDelete: "CASCADE" })
  influencer: InfluencerEntity;
}
