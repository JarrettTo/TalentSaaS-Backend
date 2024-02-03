import { MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";


@Entity("strategy")
export class StrategyEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @UpdateDateColumn()
  @AutoMap()
  createdAt: Date;
  
  @AutoMap()
  @Column({ nullable: true })
  influencer?: number;

  @AutoMap()
  @Column({ nullable: true })
  manager?: string;

  @AutoMap()
  @Column({ nullable: true })
  tasks?: string;

  @AutoMap()
  @Column({ nullable: true })
  PR?: string;

  @AutoMap()
  @Column({ nullable: true })
  life?: string;

  @AutoMap()
  @Column({  nullable: true })
  high_level?: string;

  @AutoMap()
  @Column({  nullable: true })
  brand_strategy?: string;
  
  @AutoMap()
  @Column({  nullable: true })
  content_tiktok?: string;

  @AutoMap()
  @Column({  nullable: true })
  content_ig?: string;
  @AutoMap()
  @Column({  nullable: true })
  content_yt?: string;
  @AutoMap()
  @Column({  nullable: true })
  content_collabs?: string;
  @AutoMap()
  @Column({  nullable: true })
  tour?: string;
  @AutoMap()
  @Column({  nullable: true })
  hosting?: string;
  @AutoMap()
  @Column({  nullable: true })
  podcast?: string;
  @AutoMap()
  @Column({  nullable: true })
  film?: string;
  @AutoMap()
  @Column({  nullable: true })
  projects?: string;

  
}
