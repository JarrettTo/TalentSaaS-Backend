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
import { TiktokInsightsEntity } from "./tiktok.insights.entity";

@Entity("tiktok-device-insight")
export class TiktokDeviceInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => TiktokInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: TiktokInsightsEntity;
}
