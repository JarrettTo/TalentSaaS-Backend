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

import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";

@Entity("influencer-statistic-verify-token")
export class InfluencerStatisticVerifyTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  code: string;

  @Column()
  @AutoMap()
  expiredAt: Date;

  @ManyToOne(() => InfluencerEntity, { onDelete: "CASCADE" })
  influencer: InfluencerEntity;
}
