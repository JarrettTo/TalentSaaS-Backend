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

@Entity("youtube-age-insight")
export class YoutubeAgeInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => YoutubeInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: YoutubeInsightsEntity;
}
