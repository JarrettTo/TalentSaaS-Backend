import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, RelationId, PrimaryGeneratedColumn } from "typeorm";

import { ManagerEntity } from "./manager.entity";

@Entity("confirm-email-token")
export class ConfirmEmailTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expirationDate: Date;

  @Column()
  token: string;

  @ManyToOne(() => ManagerEntity, { eager: true, onDelete: "CASCADE" })
  manager: ManagerEntity;
}
