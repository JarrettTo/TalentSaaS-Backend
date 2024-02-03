import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { TiktokLogInsightsEntity } from "./tiktok-log.insights.entity";

@Entity("tiktok-log-country-insight")
export class TiktokLogCountryInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => TiktokLogInsightsEntity, { onDelete: "CASCADE" })
  personalLogInsights: TiktokLogInsightsEntity;
}
