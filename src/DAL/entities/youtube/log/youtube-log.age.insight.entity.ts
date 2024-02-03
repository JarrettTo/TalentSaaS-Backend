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

@Entity("youtube-log-age-insight")
export class YoutubeLogAgeInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => YoutubeLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: YoutubeLogInsightsEntity;
}
