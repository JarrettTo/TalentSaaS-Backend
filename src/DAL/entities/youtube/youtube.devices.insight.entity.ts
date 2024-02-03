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
import { YoutubeInsightsEntity } from "./youtube.insights.entity";

@Entity("youtube-devices-insight")
export class YoutubeDevicesInsightEntity extends BaseEntity {
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

  @OneToOne(() => YoutubeInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: YoutubeInsightsEntity;
}
