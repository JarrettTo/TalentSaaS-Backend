import { ManagerEntity } from './manager.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { PlacementEntity } from "./placement.entity";
import { QuoteEntity } from './quote.entity';
import { QuoteLogEntity } from './quote-log.entity';
import { QuoteListEntity } from './quote-list.entity';

@Entity("quote-log-list")
export class QuoteLogListEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  name: string;

  @AutoMap()
  @Column({ nullable: true })
  brand: string;


  @Column()
  @AutoMap()
  verifyCode: string;

  @Column()
  @AutoMap()
  expiredAt: Date;

  @AutoMap(() => QuoteLogEntity)
  @OneToMany(() => QuoteLogEntity, (quote) => quote.quoteLogList, { cascade: true })
  quotesLogs?: QuoteLogEntity[];

  @ManyToOne(() => QuoteListEntity, (list) => list.logs, { onDelete: "CASCADE" })
  @AutoMap(() => QuoteListEntity)
  quoteList: QuoteListEntity;
}
