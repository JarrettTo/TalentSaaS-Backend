import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { YoutubeLogInsightsEntity } from "./youtube-log.insights.entity";

@Entity("youtube-log-country-insight")
export class YoutubeLogCountryInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
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
