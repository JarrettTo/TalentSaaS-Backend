import { YoutubeLogInsightsEntity } from "./youtube-log.insights.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { AutoMap } from "@automapper/classes";

@Entity("youtube-log-completion-rate-insight")
export class YoutubeLogCompletionRateInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  averageViewDuration: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  averageViewPercentage: number;

  @OneToOne(() => YoutubeLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: YoutubeLogInsightsEntity;
}
