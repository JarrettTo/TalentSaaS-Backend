import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, RelationId } from "typeorm";

import { ManagerEntity } from "./manager.entity";

@Entity("token")
export class TokenEntity extends BaseEntity {
  @PrimaryColumn()
  jti: string;

  @Column()
  expiresAt: Date;

  @RelationId("manager")
  @Column()
  managerId: number;

  @ManyToOne(() => ManagerEntity, { eager: true, onDelete: "CASCADE" })
  manager: ManagerEntity;
}
