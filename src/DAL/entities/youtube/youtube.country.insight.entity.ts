import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { YoutubeInsightsEntity } from "./youtube.insights.entity";

@Entity("youtube-country-insight")
export class YoutubeCountryInsightEntity extends BaseEntity {
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
