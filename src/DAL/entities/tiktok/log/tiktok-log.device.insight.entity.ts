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
import { TiktokLogInsightsEntity } from "./tiktok-log.insights.entity";

@Entity("tiktok-log-device-insight")
export class TiktokLogDeviceInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => TiktokLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: TiktokLogInsightsEntity;
}
