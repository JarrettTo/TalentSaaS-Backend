import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { YoutubeInsightsEntity } from "./youtube.insights.entity";

@Entity("youtube-gender-insight")
export class YoutubeGenderInsightEntity extends BaseEntity {
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

  @OneToOne(() => YoutubeInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: YoutubeInsightsEntity;
}
