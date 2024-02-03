import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { InfluencerEntity } from "./influencer.entity";
import { QuoteListEntity } from "./quote-list.entity";

@Entity("quote")
export class QuoteEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;
  
  @Column({nullable: true })
  @AutoMap()
  crossPost?: number;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  totalFee: number;
  
  @Column({nullable: true })
  @AutoMap()
  instaStorySet?: number;
  
  @Column({nullable: true })
  @AutoMap()
  linkInBio?: number;
 
  @Column({nullable: true })
  @AutoMap()
  amplificationDigital?: number;

  @Column({nullable: true })
  @AutoMap()
  amplificationDigitalMonths?: number;

  @Column({nullable: true })
  @AutoMap()
  amplificationDigitalMonthsRange?: number;

  @Column({nullable: true })
  @AutoMap()
  amplificationTraditional?: number;

  @Column({nullable: true })
  @AutoMap()
  amplificationTraditionalMonths?: number;

  @Column({nullable: true })
  @AutoMap()
  amplificationTraditionalMonthsRange?: number;
  
  @Column({nullable: true })
  @AutoMap()
  exclusivity?: number;

  @Column({nullable: true })
  @AutoMap()
  exclusivityMonths?: number;

  @Column({nullable: true })
  @AutoMap()
  exclusivityMonthsRange?: number;
  
  @Column({nullable: true })
  @AutoMap()
  shootDay?: number;
  
  @Column({nullable: true })
  @AutoMap()
  UGCCreative?: number;

  @Column({nullable: true })
  @AutoMap()
  paidMedia?: number;

  @AutoMap()
  @Column({default: false })
  isInstagram?: boolean;

  @AutoMap()
  @Column({default: false })
  isYoutube?: boolean;

  @AutoMap()
  @Column({default: false })
  isTiktok?: boolean;

  @AutoMap(() => InfluencerEntity)
  @ManyToOne(() => InfluencerEntity, (el) => el.quotes, { onDelete: "CASCADE" })
  influencer: InfluencerEntity;

  @AutoMap(() => QuoteListEntity)
  @ManyToOne(() => QuoteListEntity, (el) => el.quotes, { onDelete: "CASCADE" })
  quoteList: QuoteListEntity;
}
