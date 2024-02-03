import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { InstagramLogInsightsEntity } from "./instagram-log.insights.entity";

@Entity("instagram-log-country-insight")
export class InstagramLogCountryInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => InstagramLogInsightsEntity, { onDelete: "CASCADE" })
  @AutoMap()
  personalLogInsights: InstagramLogInsightsEntity;
}
