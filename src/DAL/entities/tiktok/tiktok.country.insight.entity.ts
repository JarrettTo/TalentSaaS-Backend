import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { TiktokInsightsEntity } from "./tiktok.insights.entity";

@Entity("tiktok-country-insight")
export class TiktokCountryInsightEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "decimal", default: 0.0 })
  @AutoMap()
  count: number;

  @ManyToOne(() => TiktokInsightsEntity, { onDelete: "CASCADE" })
  personalInsights: TiktokInsightsEntity;
}
