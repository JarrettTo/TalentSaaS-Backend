import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, RelationId, PrimaryGeneratedColumn } from "typeorm";

import { ManagerEntity } from "./manager.entity";

@Entity("reset-password-token")
export class ResetPasswordTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expirationDate: Date;

  @Column()
  token: string;

  @ManyToOne(() => ManagerEntity, { eager: true, onDelete: "CASCADE" })
  manager: ManagerEntity;
}
