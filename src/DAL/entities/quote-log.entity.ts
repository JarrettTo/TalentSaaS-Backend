import { ManagerEntity } from './manager.entity';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, RelationId, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { PlacementEntity } from "./placement.entity";
import { QuoteEntity } from './quote.entity';
import { QuoteLogListEntity } from './quote-log-list.entity';

@Entity("quote-log")
export class  QuoteLogEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @UpdateDateColumn()
  @AutoMap()
  createdAt: Date;

  @AutoMap(() => ManagerEntity)
  @ManyToOne(() => ManagerEntity, { onDelete: "CASCADE" })
  manager: ManagerEntity;

  @AutoMap()
  @Column({ type: "decimal", nullable: true })
  totalFee: number;

  @Column({nullable: true })
  @AutoMap()
  crossPost?: number;
  
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

  @AutoMap()
  @Column({ default: false })
  isArchived: boolean;

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

  @Column()
  @AutoMap()
  quoteId: number;

  @AutoMap(() => QuoteEntity)
  @ManyToOne(() => QuoteEntity)
  @JoinColumn({ name: 'quoteId' })
  quote: QuoteEntity;

  @AutoMap(() => QuoteLogListEntity)
  @ManyToOne(() => QuoteLogListEntity, (el) => el.quotesLogs, { onDelete: "CASCADE" })
  quoteLogList: QuoteLogListEntity;
}
