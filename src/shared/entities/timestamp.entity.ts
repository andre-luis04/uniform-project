import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class TimestampedEntity {
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updated_at?: Date;
}
