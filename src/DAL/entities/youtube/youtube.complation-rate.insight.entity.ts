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

@Entity("youtube-completion-rate-insight")
export class YoutubeCompletionRateInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  averageViewDuration: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  averageViewPercentage: number;

  @OneToOne(() => YoutubeInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: YoutubeInsightsEntity;
}
