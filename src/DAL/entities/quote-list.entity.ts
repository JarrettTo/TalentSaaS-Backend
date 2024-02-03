import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { QuoteEntity } from "./quote.entity";
import { QuoteLogListEntity } from "./quote-log-list.entity";

@Entity("quote-list")
export class QuoteListEntity {
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

  @AutoMap()
  @Column({ default: false })
  isArchived: boolean;

  @AutoMap(() => QuoteEntity)
  @OneToMany(() => QuoteEntity, (quote) => quote.quoteList, { cascade: true })
  quotes?: QuoteEntity[];

  @AutoMap()
  @OneToMany(() => QuoteLogListEntity, (quote) => quote.quoteList, { cascade: true })
  logs?: QuoteLogListEntity[];

}
