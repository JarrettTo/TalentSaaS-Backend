import { Column, Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";

@Entity("influencer-group")
export class InfluencerGroupEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @OneToMany(() => InfluencerEntity, (related) => related.group, { eager: true, cascade: true })
  influencers: InfluencerEntity[];
}
