import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { YoutubeLogInsightsEntity } from "./youtube-log.insights.entity";

@Entity("youtube-log-gender-insight")
export class YoutubeLogGenderInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  maleCount: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  femaleCount: number;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  otherCount: number;

  @OneToOne(() => YoutubeLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: YoutubeLogInsightsEntity;
}
