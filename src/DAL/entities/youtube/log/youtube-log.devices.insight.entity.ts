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
import { YoutubeLogInsightsEntity } from "./youtube-log.insights.entity";

@Entity("youtube-log-devices-insight")
export class YoutubeLogDevicesInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  MOBILE: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  DESKTOP: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  TV: number;

  @OneToOne(() => YoutubeLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: YoutubeLogInsightsEntity;
}
